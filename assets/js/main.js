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
  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      var btn = this.querySelector('button[type="submit"]');
      var success = document.getElementById('formSuccess');
      var lang = document.documentElement.getAttribute('lang') || 'en';
      btn.disabled = true;
      btn.textContent = lang === 'ar' ? 'جارٍ الإرسال...' : 'Sending...';
      setTimeout(function() {
        contactForm.reset();
        btn.disabled = false;
        btn.textContent = lang === 'ar' ? 'إرسال الرسالة' : 'Send Message';
        if (success) {
          success.style.display = 'block';
          setTimeout(function() { success.style.display = ''; }, 6000);
        }
      }, 800);
    });
  }

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
