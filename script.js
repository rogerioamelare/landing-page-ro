/* =============================================
   ROGÉRIO MELARÉ — SCRIPTS (LIGHT THEME)
   ============================================= */

// ---- NAVBAR SCROLL & ACTIVE STATES ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

// ---- HAMBURGER MENU ----
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', navLinks.classList.contains('open'));
  });

  // Close menu on link click
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
}

// ---- NUMBER COUNTER ANIMATION (HERO STATS) ----
function animateCounter(el, target, duration = 1500) {
  let start = 0;
  const step = Math.ceil(target / (duration / 16));
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      el.textContent = target;
      clearInterval(timer);
    } else {
      el.textContent = start;
    }
  }, 16);
}

const counters = document.querySelectorAll('.stat-num[data-target]');
let countersAnimated = false;
const heroObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !countersAnimated) {
      countersAnimated = true;
      counters.forEach(counter => {
        const target = parseInt(counter.dataset.target, 10);
        animateCounter(counter, target);
      });
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
  heroObserver.observe(heroStats);
}

// ---- SCROLL REVEAL ANIMATIONS ----
const revealElements = document.querySelectorAll('.spec-card, .tl-item, .service-item, .chip, .values-card');

revealElements.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Small delay based on sibling index for staggered effect
      const parent = entry.target.parentElement;
      const index = parent ? Array.from(parent.children).indexOf(entry.target) : 0;
      
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, 100 * index);
      
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

revealElements.forEach(el => revealObserver.observe(el));

// ---- SCROLL SPY (ACTIVE NAV LINKS) ----
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link:not(.nav-cta)');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navItems.forEach(link => {
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }
  });
}, { rootMargin: '-40% 0px -60% 0px' });

sections.forEach(section => sectionObserver.observe(section));

// ---- SMOOTH SCROLL FOR HASH LINKS ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetEl = document.querySelector(targetId);
    if (targetEl) {
      e.preventDefault();
      // Offset for fixed navbar
      const navHeight = navbar.offsetHeight;
      const targetPos = targetEl.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top: targetPos, behavior: 'smooth' });
    }
  });
});

console.log('%cCasa ÍRIS — Rogério Melaré', 'color: #0f766e; font-size: 14px; font-weight: bold;');
console.log('Fisioterapia Neurofuncional & Terapia Intensiva');
