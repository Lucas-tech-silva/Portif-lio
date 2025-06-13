document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initScrollAnimations();
  initLazyLoading();
  initContactForm();
});

function initNavigation() {
  const navbar = document.querySelector('.navbar');
  const burger = document.querySelector('.burger');
  const navLinks = document.querySelector('.nav-links');
  const body = document.body;

  function toggleNav() {
    navLinks.classList.toggle('nav-active');
    burger.classList.toggle('toggle');
    body.classList.toggle('no-scroll');
    burger.setAttribute('aria-expanded', navLinks.classList.contains('nav-active'));
  }

  burger?.addEventListener('click', toggleNav);
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      if (navLinks.classList.contains('nav-active')) toggleNav();
    });
  });

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });
}

function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  const elementsToAnimate = document.querySelectorAll('.skill-card, .project-card, .section-title');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
  animatedElements.forEach(el => observer.observe(el));
  elementsToAnimate.forEach(el => {
    if (!el.classList.contains('animate-on-scroll')) {
      el.classList.add('animate-on-scroll');
      observer.observe(el);
    }
  });
}

function initLazyLoading() {
  if ('loading' in HTMLImageElement.prototype) {
    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
      if (!img.hasAttribute('width') || !img.hasAttribute('height')) {
        img.setAttribute('width', '600');
        img.setAttribute('height', '400');
      }
    });
  }
}

function initContactForm() {
  const form = document.getElementById('formulario-contato');
  const submitButton = document.getElementById('btn-submit');
  const successMessage = document.getElementById('success-message');

  if (!form || !submitButton || !successMessage) return;

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    submitButton.style.display = 'none';
    successMessage.style.display = 'block';

    setTimeout(() => {
      successMessage.style.display = 'none';
      submitButton.style.display = 'inline-block';
      form.submit();
    }, 2000);
  });
}

function toggleTheme() {
  if (document.body.getAttribute('data-theme') === 'dark') {
    document.body.removeAttribute('data-theme');
    localStorage.setItem('theme', 'light');
  } else {
    document.body.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  }
}

document.getElementById('mobile-theme-toggle').addEventListener('click', toggleTheme);

if (localStorage.getItem('theme') === 'dark') {
  document.body.setAttribute('data-theme', 'dark');
}

const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= (sectionTop - 200)) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    link.removeAttribute('aria-current');
    if (link.getAttribute('href').substring(1) === current) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });
});                             