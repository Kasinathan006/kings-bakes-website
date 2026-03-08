document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('admin-login-form');
    const errorMsg = document.getElementById('login-error');

    // Check if already logged in
    if (localStorage.getItem('adminToken')) {
        window.location.href = '/admin-dashboard.html';
    }

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const btn = document.getElementById('login-btn');

        btn.textContent = 'Logging in...';
        btn.disabled = true;
        errorMsg.style.display = 'none';

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/v1/admin/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            const data = await res.json();

            if (res.ok) {
                localStorage.setItem('adminToken', data.token);
                localStorage.setItem('adminUser', JSON.stringify(data));
                window.location.href = '/admin-dashboard.html';
            } else {
                errorMsg.textContent = data.message || 'Login failed';
                errorMsg.style.display = 'block';
            }
        } catch (err) {
            errorMsg.textContent = 'Network error. Backend might be down.';
            errorMsg.style.display = 'block';
        } finally {
            btn.textContent = 'Login';
            btn.disabled = false;
        }
    });
});
