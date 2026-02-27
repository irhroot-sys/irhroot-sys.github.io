// AALKC.com - Main JavaScript
(function() {
  'use strict';

  // Mobile menu toggle
  var menuToggle = document.querySelector('.menu-toggle');
  var navLinks = document.querySelector('.nav-links');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      this.classList.toggle('active');
    });

    navLinks.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
      });
    });
  }

  // Scroll reveal animation
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

  // Contact form handling
  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      var btn = this.querySelector('button[type="submit"]');
      var success = document.getElementById('formSuccess');
      btn.disabled = true;
      btn.textContent = 'Sending...';
      setTimeout(function() {
        contactForm.reset();
        btn.disabled = false;
        btn.textContent = 'Send Message';
        if (success) {
          success.style.display = 'block';
          setTimeout(function() { success.style.display = ''; }, 6000);
        }
      }, 800);
    });
  }

  // Smooth scroll for anchor links
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
