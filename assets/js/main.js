// rh7.ninja - Main JavaScript
(function() {
  'use strict';

  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      this.classList.toggle('active');
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
      });
    });
  }

  // Set active nav link based on current page
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function(link) {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // Typing effect for hero subtitle
  function typeEffect(element, text, speed) {
    if (!element) return;
    let i = 0;
    element.textContent = '';
    function type() {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    }
    type();
  }

  // Initialize typing effect on hero
  const heroSubtitle = document.querySelector('.hero-subtitle');
  if (heroSubtitle) {
    const text = heroSubtitle.getAttribute('data-text') || heroSubtitle.textContent;
    typeEffect(heroSubtitle, text, 50);
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href.length > 1) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  // Simple scroll reveal animation
  function reveal() {
    var reveals = document.querySelectorAll('.skill-card, .about-content');
    reveals.forEach(function(element) {
      var windowHeight = window.innerHeight;
      var elementTop = element.getBoundingClientRect().top;
      var revealPoint = 150;
      if (elementTop < windowHeight - revealPoint) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
        
        // Animate progress bars when card becomes visible
        var progressBar = element.querySelector('.progress-bar');
        if (progressBar && !progressBar.classList.contains('animated')) {
          var progress = progressBar.getAttribute('data-progress');
          progressBar.style.width = progress + '%';
          progressBar.classList.add('animated');
        }
      }
    });
  }

  // Set initial styles for reveal animation
  document.querySelectorAll('.skill-card, .about-content').forEach(function(el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });

  window.addEventListener('scroll', reveal);
  reveal(); // Initial check

  // Form handling (prevent actual submission for demo)
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      var btn = this.querySelector('button[type="submit"]');
      var originalText = btn.textContent;
      btn.textContent = 'Message Sent!';
      btn.style.background = 'rgba(0, 255, 157, 0.2)';
      this.reset();
      setTimeout(function() {
        btn.textContent = originalText;
        btn.style.background = '';
      }, 3000);
    });
  }

  // Console easter egg
  console.log('%c🔒 rh7.ninja', 'font-size: 20px; color: #00ff9d; font-weight: bold;');
  console.log('%cSecuring the digital frontier...', 'color: #64ffda;');
})();
