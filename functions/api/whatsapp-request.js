const json = (message, status = 200) => new Response(JSON.stringify({ message }), {
    status,
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-store'
    }
});

const success = 'Your request has been received. Our team will review it and manually add approved members to WhatsApp.';

export async function onRequestPost({ request, env }) {
    const origin = request.headers.get('Origin');
    if (origin && origin !== new URL(request.url).origin) {
        return json('Please submit your request from the club website.', 403);
    }

    let form;
    try {
        form = await request.formData();
    } catch {
        return json('Invalid form submission.', 400);
    }
    if (String(form.get('website') || '').trim()) return json(success);

    const name = String(form.get('name') || '').trim();
    const email = String(form.get('email') || '').trim().toLowerCase();
    const rawPhone = String(form.get('phone') || '').trim();
    const phone = rawPhone.replace(/[\s().-]/g, '');

    if (!name || name.length > 100) return json('Please enter your name.', 400);
    if (email.length > 254 || !/^[^\s@]+@bu\.edu$/.test(email)) {
        return json('Please use your BU email address ending in @bu.edu.', 400);
    }
    if (rawPhone.length > 30 || !/^\+[1-9]\d{6,14}$/.test(phone)) {
        return json('Please enter your WhatsApp number with a + and country code, such as +16175550123.', 400);
    }

    if (!env.MAILERLITE_API_KEY || !env.MAILERLITE_WHATSAPP_GROUP_ID) {
        return json('Requests are temporarily unavailable. Please try again later or contact bucommodities@gmail.com.', 503);
    }
    if (String(env.MAILERLITE_WHATSAPP_GROUP_ID) === String(env.MAILERLITE_GROUP_ID)) {
        return json('Requests are temporarily unavailable. Please contact bucommodities@gmail.com.', 503);
    }

    try {
        const response = await fetch('https://connect.mailerlite.com/api/subscribers', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${env.MAILERLITE_API_KEY}`,
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({
                email,
                fields: { name, phone },
                groups: [String(env.MAILERLITE_WHATSAPP_GROUP_ID)]
            })
        });
        if (response.status === 429) {
            return json('Too many requests. Please wait a moment and try again.', 429);
        }
        if (!response.ok) {
            return json('We could not save your request. Please try again later or contact bucommodities@gmail.com.', 502);
        }
        return json(success);
    } catch {
        return json('We could not save your request. Please try again later or contact bucommodities@gmail.com.', 502);
    }
}

export function onRequest(context) {
    return context.request.method === 'POST'
        ? onRequestPost(context)
        : json('Method not allowed.', 405);
}
