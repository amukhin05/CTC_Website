(() => {
    const form = document.getElementById('whatsapp-request-form');
    const status = document.getElementById('whatsapp-status');
    const button = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        if (button.disabled) return;
        status.textContent = '';
        status.className = 'mailing-status';
        button.disabled = true;
        button.textContent = 'Sending...';

        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: { Accept: 'application/json' }
            });
            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.message || 'We could not save your request. Please try again.');
            }
            form.reset();
            status.textContent = result.message;
            status.classList.add('mailing-status-success');
        } catch (error) {
            status.textContent = error.message || 'Please try again or email bucommodities@gmail.com.';
            status.classList.add('mailing-status-error');
        } finally {
            button.disabled = false;
            button.textContent = 'Request to join';
        }
    });
})();
