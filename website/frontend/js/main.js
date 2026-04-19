/**
 * Navii — Smart Assistive Glasses
 * Main JavaScript Module
 *
 * Handles: GSAP animations, navigation, scroll effects,
 * cursor glow, ripple effects, and accessibility.
 */

// =========================================
// GSAP & ScrollTrigger Setup
// =========================================
gsap.registerPlugin(ScrollTrigger);


// =========================================
// DOM References
// =========================================
const navbar     = document.getElementById('navbar');
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const sections   = document.querySelectorAll('section[id]');
const navLinks   = document.querySelectorAll('.nav-links a');


// =========================================
// Scroll Progress Bar
// =========================================
function initScrollProgress() {
  gsap.to('#scrollProgress', {
    scaleX: 1,
    ease: 'none',
    scrollTrigger: {
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.3,
    },
  });
}


// =========================================
// Navigation
// =========================================
function initNavigation() {
  // Scroll-based nav styling (frosted glass effect)
  ScrollTrigger.create({
    start: 'top -60',
    end: 99999,
    toggleClass: { className: 'scrolled', targets: navbar },
  });

  // Active nav link highlight on scroll
  ScrollTrigger.create({
    start: 'top top',
    end: 'bottom bottom',
    onUpdate: () => {
      let current = '';
      sections.forEach((section) => {
        const top = section.offsetTop - 100;
        if (window.scrollY >= top) {
          current = section.getAttribute('id');
        }
      });
      navLinks.forEach((a) => {
        a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
      });
    },
  });
}


// =========================================
// Mobile Menu
// =========================================
function toggleMenu() {
  hamburger.classList.toggle('active');
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open')
    ? 'hidden'
    : '';
}

function closeMenu() {
  hamburger.classList.remove('active');
  mobileMenu.classList.remove('open');
  document.body.style.overflow = '';
}

// Expose to global scope for inline onclick handlers
window.toggleMenu = toggleMenu;
window.closeMenu = closeMenu;


// =========================================
// Cursor Glow (desktop only)
// =========================================
function initCursorGlow() {
  if (!window.matchMedia('(pointer: fine)').matches) return;

  const glow = document.getElementById('cursorGlow');
  let mouseX = 0;
  let mouseY = 0;
  let glowX = 0;
  let glowY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateGlow() {
    glowX += (mouseX - glowX) * 0.08;
    glowY += (mouseY - glowY) * 0.08;
    glow.style.left = glowX + 'px';
    glow.style.top = glowY + 'px';
    requestAnimationFrame(animateGlow);
  }

  animateGlow();
}


// =========================================
// Hero Animations
// =========================================
function initHeroAnimations() {
  // Remove .reveal class from hero elements so CSS opacity:0 doesn't fight GSAP
  document.querySelectorAll('#hero .reveal').forEach((el) => {
    el.classList.remove('reveal');
  });

  // Set initial hidden states explicitly via GSAP
  gsap.set('.hero-badge', { y: 30, opacity: 0 });
  gsap.set('.hero-title', { y: 50, opacity: 0 });
  gsap.set('.hero-subtitle', { y: 30, opacity: 0 });
  gsap.set('.hero-actions', { y: 20, opacity: 0 });
  gsap.set('.hero-stats', { y: 30, opacity: 0 });
  gsap.set('.hero-stat', { y: 20, opacity: 0 });

  // Entrance timeline
  const heroTL = gsap.timeline({ defaults: { ease: 'power3.out' } });
  heroTL
    .to('.hero-badge', { y: 0, opacity: 1, duration: 0.8, delay: 0.3 })
    .to('.hero-title', { y: 0, opacity: 1, duration: 1 }, '-=0.4')
    .to('.hero-subtitle', { y: 0, opacity: 1, duration: 0.8 }, '-=0.5')
    .to('.hero-actions', { y: 0, opacity: 1, duration: 0.7 }, '-=0.4')
    .to('.hero-stats', { y: 0, opacity: 1, duration: 0.8 }, '-=0.3')
    .to('.hero-stat', { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 }, '-=0.4');
}


// =========================================
// Hero Parallax Orbs
// =========================================
function initHeroParallax() {
  gsap.to('.hero-orb-1', {
    y: -80,
    duration: 1,
    ease: 'none',
    scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 1 },
  });

  gsap.to('.hero-orb-2', {
    y: -50,
    x: -30,
    duration: 1,
    ease: 'none',
    scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 1 },
  });

  gsap.to('.hero-orb-3', {
    y: -100,
    duration: 1,
    ease: 'none',
    scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 1 },
  });
}


// =========================================
// Scroll Reveal Animations
// =========================================
function initScrollReveal() {
  // Per-element reveals (everything with .reveal class, except hero)
  document.querySelectorAll('.reveal').forEach((el) => {
    if (el.closest('#hero')) return;

    gsap.fromTo(
      el,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      }
    );
  });
}


// =========================================
// Staggered Grid Animations
// =========================================
function initGridAnimations() {
  const gridConfigs = [
    { parent: '.feature-grid',  child: '.feat-card',     stagger: 0.1,  y: 50 },
    { parent: '.tech-grid',     child: '.tech-card',      stagger: 0.08, y: 30 },
    { parent: '.team-grid',     child: '.team-card',      stagger: 0.1,  y: 40 },
    { parent: '.gallery-grid',  child: '.gallery-item',   stagger: 0.12, y: 40 },
    { parent: '.future-grid',   child: '.future-card',    stagger: 0.1,  y: 40 },
    { parent: '.problem-cards', child: '.prob-card',      stagger: 0.12, y: 30 },
    { parent: '.steps',         child: '.step',           stagger: 0.15, y: 30 },
  ];

  gridConfigs.forEach(({ parent, child, stagger: stg, y }) => {
    const container = document.querySelector(parent);
    if (!container) return;

    const children = container.querySelectorAll(child);
    if (!children.length) return;

    // Set initial state
    gsap.set(children, { y, opacity: 0 });

    ScrollTrigger.create({
      trigger: container,
      start: 'top 85%',
      onEnter: () => {
        gsap.to(children, {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          stagger: stg,
        });
      },
      once: true,
    });
  });
}


// =========================================
// Smooth Scroll for Anchor Links
// =========================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;

      const offset = 80;
      const y = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    });
  });
}


// =========================================
// Button Ripple Effect
// =========================================
function initRippleEffect() {
  // Inject ripple keyframe
  const style = document.createElement('style');
  style.textContent = '@keyframes rippleAnim { to { transform: scale(2.5); opacity: 0; } }';
  document.head.appendChild(style);

  // Attach ripple to buttons
  document.querySelectorAll('.btn-primary, .nav-cta').forEach((btn) => {
    btn.addEventListener('click', function (e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);

      ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        width: ${size}px;
        height: ${size}px;
        left: ${e.clientX - rect.left - size / 2}px;
        top: ${e.clientY - rect.top - size / 2}px;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: rippleAnim 0.6s ease-out forwards;
        pointer-events: none;
      `;

      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });
}


// =========================================
// Stat Counter Animation
// =========================================
function initStatCounter() {
  const statNum = document.querySelector('.stat-num');
  if (!statNum) return;

  const target = parseInt(statNum.getAttribute('data-target'), 10) || 253;
  const suffix = statNum.getAttribute('data-suffix') || '';

  ScrollTrigger.create({
    trigger: statNum,
    start: 'top 85%',
    onEnter: () => {
      // Animate the number counting up
      const counter = { val: 0 };
      gsap.to(counter, {
        val: target,
        duration: 2,
        ease: 'power2.out',
        onUpdate: () => {
          statNum.textContent = Math.round(counter.val) + suffix;
        },
      });
      // Scale-in effect
      gsap.from(statNum, {
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });
    },
    once: true,
  });
}


// =========================================
// Accessibility: Reduced Motion
// =========================================
function handleReducedMotion() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    gsap.globalTimeline.timeScale(20);
    document.querySelectorAll('.reveal').forEach((el) => {
      el.style.opacity = 1;
    });
  }
}


// =========================================
// Initialize All Modules
// =========================================
function init() {
  initScrollProgress();
  initNavigation();
  initCursorGlow();
  initHeroAnimations();
  initHeroParallax();
  initScrollReveal();
  initGridAnimations();
  initSmoothScroll();
  initRippleEffect();
  initStatCounter();
  handleReducedMotion();
}

// Run on DOM ready
init();
