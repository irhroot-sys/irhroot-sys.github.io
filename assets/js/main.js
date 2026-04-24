// AALKC.com - Main JavaScript
(function() {
  'use strict';

  // ===== LANGUAGE SWITCHER =====
  var LANG_KEY = 'aalkc-lang';

  function setLanguage(lang) {
    var html = document.documentElement;
    html.setAttribute('lang', lang);
    html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

    // Update all elements with data-en / data-ar text content
    document.querySelectorAll('[data-en]').forEach(function(el) {
      var text = el.getAttribute('data-' + lang);
      if (text !== null) {
        el.textContent = text;
      }
    });

    // Update placeholder attributes
    document.querySelectorAll('[data-placeholder-en]').forEach(function(el) {
      var ph = el.getAttribute('data-placeholder-' + lang);
      if (ph !== null) {
        el.setAttribute('placeholder', ph);
      }
    });

    // Update aria-label attributes
    document.querySelectorAll('[data-aria-en]').forEach(function(el) {
      var al = el.getAttribute('data-aria-' + lang);
      if (al !== null) {
        el.setAttribute('aria-label', al);
      }
    });

    // Update language toggle button label
    var toggleBtn = document.getElementById('langToggle');
    if (toggleBtn) {
      var toggleText = toggleBtn.querySelector('.lang-toggle-text');
      if (toggleText) {
        toggleText.textContent = lang === 'ar' ? 'English' : 'العربية';
      }
    }

    // Update select options if any have data attributes
    document.querySelectorAll('select option[data-en]').forEach(function(opt) {
      var text = opt.getAttribute('data-' + lang);
      if (text !== null) {
        opt.textContent = text;
      }
    });

    try { localStorage.setItem(LANG_KEY, lang); } catch (e) {}
  }

  // Initialise language on page load
  var savedLang = 'en';
  try { savedLang = localStorage.getItem(LANG_KEY) || 'en'; } catch (e) {}
  if (savedLang !== 'en') {
    setLanguage(savedLang);
  }

  // Language toggle button click
  var langToggle = document.getElementById('langToggle');
  if (langToggle) {
    langToggle.addEventListener('click', function() {
      var current = document.documentElement.getAttribute('lang') || 'en';
      setLanguage(current === 'en' ? 'ar' : 'en');
    });
  }

  // ===== MOBILE MENU TOGGLE =====
  var menuToggle = document.querySelector('.menu-toggle');
  var navLinks = document.querySelector('.nav-links');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function() {
      var expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!expanded));
      navLinks.classList.toggle('active');
      this.classList.toggle('active');
    });

    navLinks.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ===== NAVBAR SCROLL CLASS =====
  var navbar = document.querySelector('.navbar');
  function updateNavbar() {
    if (navbar) {
      if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
  }
  window.addEventListener('scroll', updateNavbar, { passive: true });
  updateNavbar();

  // ===== SCROLL REVEAL =====
  function revealOnScroll() {
    var reveals = document.querySelectorAll('.reveal');
    var windowHeight = window.innerHeight;
    reveals.forEach(function(el) {
      var top = el.getBoundingClientRect().top;
      if (top < windowHeight - 80) {
        el.classList.add('visible');
      }
    });
  }

  window.addEventListener('scroll', revealOnScroll, { passive: true });
  revealOnScroll();

  // ===== CONTACT FORM =====
  // Web3Forms access key — replace with your own from https://web3forms.com
  var WEB3FORMS_KEY = 'YOUR_WEB3FORMS_ACCESS_KEY';

  // --- URL param pre-selection (e.g. contact.html?inquiry=sell) ---
  (function preSelectInquiry() {
    var inquirySelect = document.getElementById('inquiry');
    if (!inquirySelect) return;
    try {
      var params = new URLSearchParams(window.location.search);
      var val = params.get('inquiry');
      if (val) {
        var opt = inquirySelect.querySelector('option[value="' + val + '"]');
        if (opt) inquirySelect.value = val;
      }
    } catch (e) {}
  })();

  // --- Inline field validation helpers ---
  function showError(inputId, msg) {
    var el = document.getElementById(inputId);
    var errSpan = document.getElementById(inputId + 'Error');
    if (el) el.classList.add('input-error');
    if (errSpan) errSpan.textContent = msg;
  }
  function clearError(inputId) {
    var el = document.getElementById(inputId);
    var errSpan = document.getElementById(inputId + 'Error');
    if (el) el.classList.remove('input-error');
    if (errSpan) errSpan.textContent = '';
  }

  // Validate on blur for live feedback
  ['firstName', 'lastName', 'email', 'message'].forEach(function(id) {
    var el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('blur', function() {
      if (el.value.trim() === '') {
        showError(id, el.getAttribute('aria-required') ? 'This field is required.' : '');
      } else if (id === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value.trim())) {
        showError('email', 'Please enter a valid email address.');
      } else {
        clearError(id);
      }
    });
    el.addEventListener('input', function() { clearError(id); });
  });

  // --- Form submit ---
  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      var lang = document.documentElement.getAttribute('lang') || 'en';
      var btn = document.getElementById('submitBtn');
      var success = document.getElementById('formSuccess');
      var valid = true;

      // Honeypot check
      var hp = document.getElementById('hp_website');
      if (hp && hp.value.trim() !== '') return; // silently drop bot submissions

      // Required field validation
      var firstName = document.getElementById('firstName');
      var lastName  = document.getElementById('lastName');
      var email     = document.getElementById('email');
      var message   = document.getElementById('message');
      var consent   = document.getElementById('privacyConsent');
      var consentErr = document.getElementById('consentError');

      if (!firstName || firstName.value.trim() === '') { showError('firstName', 'First name is required.'); valid = false; }
      else clearError('firstName');
      if (!lastName || lastName.value.trim() === '')   { showError('lastName', 'Last name is required.'); valid = false; }
      else clearError('lastName');
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) { showError('email', 'A valid email address is required.'); valid = false; }
      else clearError('email');
      if (!message || message.value.trim() === '')     { showError('message', 'Please enter your message.'); valid = false; }
      else clearError('message');
      if (!consent || !consent.checked) {
        if (consentErr) consentErr.textContent = 'You must agree to the Privacy Policy to submit.';
        valid = false;
      } else {
        if (consentErr) consentErr.textContent = '';
      }

      if (!valid) return;

      // Send via Web3Forms
      btn.disabled = true;
      btn.textContent = lang === 'ar' ? 'جارٍ الإرسال...' : 'Sending...';

      var formData = new FormData(contactForm);
      formData.append('access_key', WEB3FORMS_KEY);
      formData.append('subject', 'New Inquiry — AALKC.com');
      formData.delete('hp_website'); // don't send honeypot field

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      })
      .then(function(res) { return res.json(); })
      .then(function(data) {
        btn.disabled = false;
        btn.textContent = lang === 'ar' ? 'إرسال الرسالة' : 'Send Message';
        if (data.success) {
          contactForm.reset();
          if (success) {
            success.style.display = 'block';
            setTimeout(function() { success.style.display = ''; }, 7000);
          }
        } else {
          alert(lang === 'ar' ? 'حدث خطأ. يُرجى المحاولة مرة أخرى.' : 'Submission failed. Please try again.');
        }
      })
      .catch(function() {
        btn.disabled = false;
        btn.textContent = lang === 'ar' ? 'إرسال الرسالة' : 'Send Message';
        alert(lang === 'ar' ? 'حدث خطأ في الشبكة. يُرجى المحاولة مرة أخرى.' : 'Network error. Please try again.');
      });
    });
  }

  // ===== FOOTER YEAR =====
  var yearEl = document.getElementById('footerYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ===== SMOOTH SCROLL =====
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      var href = this.getAttribute('href');
      if (href.length > 1) {
        e.preventDefault();
        var target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

})();
