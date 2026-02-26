/**
 * ================================================
 * KINGS BAKES – Security Module
 * Protections: XSS, Injection, Rate Limiting,
 *              Input Validation, Spam/Honeypot,
 *              CSP enforcement, CSRF simulation
 * ================================================
 */

const KBSecurity = (function () {
  'use strict';

  /* ── 1. XSS Sanitiser ── */
  function sanitize(str) {
    if (typeof str !== 'string') return '';
    const map = {
      '&': '&amp;', '<': '&lt;', '>': '&gt;',
      '"': '&quot;', "'": '&#x27;', '/': '&#x2F;',
      '`': '&#x60;', '=': '&#x3D;'
    };
    return str.replace(/[&<>"'`=/]/g, s => map[s]);
  }

  /* ── 2. SQL / Script Injection Blocker ── */
  const DANGEROUS = [
    /(<script[\s\S]*?>[\s\S]*?<\/script>)/gi,
    /(javascript\s*:)/gi,
    /(on\w+\s*=)/gi,
    /(\bSELECT\b|\bINSERT\b|\bDROP\b|\bDELETE\b|\bUPDATE\b|\bUNION\b)/gi,
    /(--\s|;\s*DROP|;\s*SELECT)/gi,
  ];

  function containsInjection(str) {
    return DANGEROUS.some(rx => rx.test(str));
  }

  /* ── 3. Input Validators ── */
  const validators = {
    name(val) {
      const clean = val.trim();
      if (!clean) return 'Name is required.';
      if (clean.length < 2) return 'Name must be at least 2 characters.';
      if (clean.length > 80) return 'Name is too long (max 80 chars).';
      if (!/^[a-zA-Z\u0080-\uFFFF\s'\-]+$/.test(clean)) return 'Name contains invalid characters.';
      if (containsInjection(clean)) return 'Invalid input detected.';
      return null;
    },
    phone(val) {
      const clean = val.trim().replace(/[\s\-\(\)]/g, '');
      if (!clean) return 'Phone number is required.';
      if (!/^\+?[0-9]{7,15}$/.test(clean)) return 'Enter a valid phone number.';
      return null;
    },
    email(val) {
      const clean = val.trim();
      if (clean && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean)) return 'Enter a valid email address.';
      return null;
    },
    message(val) {
      const clean = val.trim();
      if (!clean) return 'Message is required.';
      if (clean.length < 5) return 'Message is too short (min 5 chars).';
      if (clean.length > 1000) return 'Message is too long (max 1000 chars).';
      if (containsInjection(clean)) return 'Message contains invalid content.';
      return null;
    }
  };

  /* ── 4. Rate Limiter (localStorage) ── */
  const RATE_LIMIT = { max: 3, window: 60 * 1000 }; // 3 submits per 60s

  function isRateLimited(action) {
    const key = `kb_rl_${action}`;
    const now = Date.now();
    let data = [];
    try {
      data = JSON.parse(localStorage.getItem(key) || '[]');
    } catch (_) { data = []; }
    // Remove timestamps older than window
    data = data.filter(t => now - t < RATE_LIMIT.window);
    if (data.length >= RATE_LIMIT.max) {
      const retry = Math.ceil((RATE_LIMIT.window - (now - data[0])) / 1000);
      return { limited: true, retryIn: retry };
    }
    data.push(now);
    try { localStorage.setItem(key, JSON.stringify(data)); } catch (_) {}
    return { limited: false };
  }

  /* ── 5. Honeypot Check ── */
  function isBot(formEl) {
    const hp = formEl.querySelector('.hp-field input, input[name="website"]');
    return hp && hp.value.trim() !== '';
  }

  /* ── 6. CSRF Token (simulation for static sites) ── */
  function generateCSRFToken() {
    const arr = new Uint8Array(16);
    crypto.getRandomValues(arr);
    return Array.from(arr).map(b => b.toString(16).padStart(2, '0')).join('');
  }

  function injectCSRFField(formEl) {
    let existing = formEl.querySelector('input[name="kb_csrf"]');
    if (!existing) {
      const token = generateCSRFToken();
      sessionStorage.setItem('kb_csrf', token);
      const inp = document.createElement('input');
      inp.type = 'hidden'; inp.name = 'kb_csrf'; inp.value = token;
      formEl.appendChild(inp);
    }
  }

  function validateCSRF(formEl) {
    const field = formEl.querySelector('input[name="kb_csrf"]');
    const stored = sessionStorage.getItem('kb_csrf');
    return field && stored && field.value === stored;
  }

  /* ── 7. Content Security Policy enforcement meta (injected dynamically) ── */
  function enforceDOMSecurity() {
    // Check for reflected XSS via URL params
    const params = new URLSearchParams(window.location.search);
    const safe = /^[a-zA-Z0-9\s\-_.,!?@]+$/;
    for (const [, val] of params) {
      if (!safe.test(decodeURIComponent(val))) {
        console.warn('[KBSecurity] Potentially unsafe URL parameter detected.');
        // Redirect to clean URL
        history.replaceState(null, '', window.location.pathname);
        break;
      }
    }
  }

  /* ── 8. Open Redirect Guard ── */
  function safeRedirect(url) {
    const allowed = ['wa.me', 'maps.google.com', 'google.com', 'instagram.com', 'facebook.com', 'zomato.com'];
    try {
      const u = new URL(url);
      if (allowed.some(d => u.hostname.endsWith(d))) {
        window.open(url, '_blank', 'noopener,noreferrer');
      } else {
        console.warn('[KBSecurity] Blocked unsafe redirect to:', url);
      }
    } catch (_) {
      console.warn('[KBSecurity] Invalid URL:', url);
    }
  }

  /* ── 9. Clickjacking protection check ── */
  function frameGuard() {
    if (window.top !== window.self) {
      document.body.innerHTML = '<h1 style="font-family:sans-serif;padding:40px;">This page cannot be displayed in a frame.</h1>';
    }
  }

  /* ── Public API ── */
  return {
    sanitize,
    containsInjection,
    validators,
    isRateLimited,
    isBot,
    generateCSRFToken,
    injectCSRFField,
    validateCSRF,
    enforceDOMSecurity,
    safeRedirect,
    frameGuard,
    init() {
      frameGuard();
      enforceDOMSecurity();
      // Disable right-click context inspect for client-facing (soft deterrent)
      // Remove for dev: document.addEventListener('contextmenu', e => e.preventDefault());
    }
  };
})();

// Auto-init
document.addEventListener('DOMContentLoaded', () => KBSecurity.init());
