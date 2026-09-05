const json = (body, status = 200) =>
    new Response(JSON.stringify(body), {
        status,
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Cache-Control": "no-store"
        }
    });

export async function onRequestPost(context) {
    const { request, env } = context;

    if (!env.MAILERLITE_API_KEY || !env.MAILERLITE_GROUP_ID) {
        console.error("Missing MAILERLITE_API_KEY or MAILERLITE_GROUP_ID");
        return json({ message: "The mailing list is temporarily unavailable." }, 500);
    }

    let form;
    try {
        form = await request.formData();
    } catch {
        return json({ message: "Invalid form submission." }, 400);
    }

    // Honeypot. Bots often fill hidden fields; humans should leave this blank.
    if (String(form.get("website") || "").trim()) {
        return json({ message: "You're on the list! Check your inbox for a welcome email." });
    }

    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim().toLowerCase();

    if (!name || name.length > 100) {
        return json({ message: "Please enter your name." }, 400);
    }

    // Browser validation is helpful, but validate again on the server.
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email) || email.length > 254) {
        return json({ message: "Please enter a valid email address." }, 400);
    }

    try {
        const response = await fetch("https://connect.mailerlite.com/api/subscribers", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${env.MAILERLITE_API_KEY}`,
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                email,
                fields: { name },
                groups: [String(env.MAILERLITE_GROUP_ID)]
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("MailerLite API error:", response.status, errorText);

            if (response.status === 422) {
                return json({ message: "Please check your name and email address and try again." }, 400);
            }

            if (response.status === 429) {
                return json({ message: "Too many signup attempts. Please wait a moment and try again." }, 429);
            }

            return json({ message: "We couldn't add you right now. Please try again shortly." }, 502);
        }

        return json({
            message: "You're on the list! Check your inbox for a welcome email."
        });
    } catch (error) {
        console.error("MailerLite request failed:", error);
        return json({ message: "We couldn't add you right now. Please try again shortly." }, 502);
    }
}

export function onRequest(context) {
    if (context.request.method === "POST") {
        return onRequestPost(context);
    }

    return json({ message: "Method not allowed." }, 405);
}
