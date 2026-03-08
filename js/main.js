/**
 * Kings Bakes – Main JavaScript
 * Features: Navbar scroll, reveal animations,
 *           mobile menu, WhatsApp order, toast
 */
'use strict';

/* ── Navbar Scroll + Hero Parallax ── */
const navbar = document.getElementById('navbar');
const heroBgEl = document.querySelector('.hero-bg');
// On inner pages (no full-screen hero), darken navbar immediately
if (navbar && !document.getElementById('hero')) {
    navbar.classList.add('scrolled');
}
if (navbar || heroBgEl) {
    window.addEventListener('scroll', () => {
        const sy = window.scrollY;
        if (navbar && document.getElementById('hero')) navbar.classList.toggle('scrolled', sy > 60);
        if (heroBgEl) heroBgEl.style.transform = `translateY(${sy * 0.28}px)`;
    }, { passive: true });
}

/* ── Mobile Menu ── */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        navLinks.classList.toggle('open');
        document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });
    navLinks.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            hamburger.classList.remove('open');
            navLinks.classList.remove('open');
            document.body.style.overflow = '';
        });
    });
}

/* ── Active Nav Link ── */
(function markActive() {
    const page = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(a => {
        const href = a.getAttribute('href');
        if (href === page || (page === '' && href === 'index.html')) {
            a.classList.add('active');
        }
    });
})();

/* ── Reveal on Scroll ── */
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('visible');
                observer.unobserve(e.target);
            }
        });
    }, { threshold: 0.12 });
    revealEls.forEach(el => observer.observe(el));
}

/* ── Toast Notification ── */
function showToast(msg, icon = '✅') {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.innerHTML = `<span class="t-icon">${icon}</span>${KBSecurity.sanitize(msg)}`;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3500);
}

/* ── WhatsApp Order ── */
function orderViaWhatsApp(item = '') {
    const phone = '917639277171'; // Kings Bakes number
    const msg = item
        ? `Hi Kings Bakes! I'd like to order: *${item}*. Please let me know the availability and details.`
        : `Hi Kings Bakes! I'd like to place an order. Please guide me.`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
    KBSecurity.safeRedirect(url);
    showToast('Opening WhatsApp…', '💬');
}

// Attach to all order buttons
document.querySelectorAll('[data-order]').forEach(btn => {
    btn.addEventListener('click', () => {
        const item = btn.getAttribute('data-order');
        orderViaWhatsApp(item);
    });
});

/* ── Contact Form Handler ── */
(function setupContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    // Inject CSRF token
    KBSecurity.injectCSRFField(form);

    const fields = {
        name: { el: form.querySelector('#name'), errEl: form.querySelector('#nameErr') },
        phone: { el: form.querySelector('#phone'), errEl: form.querySelector('#phoneErr') },
        email: { el: form.querySelector('#email'), errEl: form.querySelector('#emailErr') },
        message: { el: form.querySelector('#message'), errEl: form.querySelector('#messageErr') },
    };

    function showError(key, msg) {
        const f = fields[key];
        if (!f.el || !f.errEl) return;
        f.el.classList.add('error');
        f.errEl.textContent = msg;
        f.errEl.classList.add('show');
    }

    function clearError(key) {
        const f = fields[key];
        if (!f.el || !f.errEl) return;
        f.el.classList.remove('error');
        f.errEl.classList.remove('show');
    }

    function clearAll() { Object.keys(fields).forEach(clearError); }

    // Inline validation on blur
    Object.keys(fields).forEach(key => {
        const el = fields[key].el;
        if (!el) return;
        el.addEventListener('blur', () => {
            const validator = KBSecurity.validators[key];
            if (validator) {
                const err = validator(el.value);
                err ? showError(key, err) : clearError(key);
            }
        });
    });

    form.addEventListener('submit', async function (e) {
        e.preventDefault();
        clearAll();

        const submitBtn = form.querySelector('#submitBtn');
        const formMsg = form.querySelector('#formMsg');

        // ── Security Checks ──
        if (KBSecurity.isBot(form)) {
            console.info('[KBSecurity] Bot submission blocked.');
            return;
        }

        const rl = KBSecurity.isRateLimited('contact_form');
        if (rl.limited) {
            if (formMsg) {
                formMsg.textContent = `Too many submissions. Please wait ${rl.retryIn}s and try again.`;
                formMsg.className = 'form-msg error';
            }
            return;
        }

        if (!KBSecurity.validateCSRF(form)) {
            if (formMsg) {
                formMsg.textContent = 'Session error. Please refresh the page and try again.';
                formMsg.className = 'form-msg error';
            }
            return;
        }

        // ── Validate All Fields ──
        let hasError = false;
        Object.keys(fields).forEach(key => {
            const el = fields[key].el;
            if (!el) return;
            const validator = KBSecurity.validators[key];
            if (validator) {
                const err = validator(el.value);
                if (err) { showError(key, err); hasError = true; }
            }
        });

        if (hasError) return;

        // ── Build Safe Payload ──
        const payload = {
            name: KBSecurity.sanitize(fields.name.el.value.trim()),
            phone: KBSecurity.sanitize(fields.phone.el.value.trim()),
            email: KBSecurity.sanitize(fields.email.el.value.trim()),
            message: KBSecurity.sanitize(fields.message.el.value.trim()),
        };

        // ── Submit to Backend API ──
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending…';
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/v1/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const data = await response.json();

            if (data.success) {
                if (formMsg) {
                    formMsg.textContent = '✅ Message sent successfully! We will contact you soon.';
                    formMsg.className = 'form-msg success';
                }
                form.reset();
            } else {
                if (formMsg) {
                    formMsg.textContent = 'Error: ' + (data.error || 'Failed to send');
                    formMsg.className = 'form-msg error';
                }
            }
        } catch (error) {
            if (formMsg) {
                formMsg.textContent = 'Network error. Please try again later.';
                formMsg.className = 'form-msg error';
            }
        }

        // Refresh CSRF token after submit
        KBSecurity.injectCSRFField(form);

        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
        }
    });
})();

/* ── Smooth Counter Animation ── */
function animateCounter(el, target, duration = 1500) {
    const start = performance.now();
    const update = (now) => {
        const p = Math.min((now - start) / duration, 1);
        el.textContent = Math.floor(p * target) + (el.dataset.suffix || '');
        if (p < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
}
document.querySelectorAll('[data-counter]').forEach(el => {
    const io = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
            animateCounter(el, parseInt(el.dataset.counter));
            io.disconnect();
        }
    });
    io.observe(el);
});


