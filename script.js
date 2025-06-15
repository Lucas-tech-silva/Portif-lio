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

  document.addEventListener('click', (event) => {
    const isClickInsideNav = navLinks.contains(event.target);
    const isClickOnBurger = burger.contains(event.target);

    if (!isClickInsideNav && !isClickOnBurger && navLinks.classList.contains('nav-active')) {
      toggleNav();
    }
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

form.addEventListener('submit', e => {
  e.preventDefault();
  if (submitButton.disabled) return;

  clearErrors();

  // Exibir botão de sucesso e esconder o botão de enviar assim que o usuário clicar
  submitButton.style.display = 'none';
  successMessage.style.display = 'block';

  const formData = new FormData(form);
  let firstError = null;
  let hasError = false;

  for (const [name, value] of formData.entries()) {
    const field = form.querySelector(`[name="${name}"]`);
    if (!value.trim()) {
      const messages = {
        name: 'Digite seu nome completo.',
        email: 'Digite o seu e-mail.',
        subject: 'Digite o assunto que deseja tratar.',
        message: 'Por favor, escreva a sua mensagem.'
      };
      showError(field, messages[name] || 'Este campo é obrigatório.');
      if (!firstError) firstError = field;
      hasError = true;
    } else if (name === 'email' && !/^\S+@\S+\.\S+$/.test(value)) {
      showError(field, 'Ops! Parece que o e-mail está inválido.');
      if (!firstError) firstError = field;
      hasError = true;
    }
  }

  if (hasError) {
    firstError.focus();
    // Como tem erro, esconder o sucesso e mostrar o botão de enviar de volta
    submitButton.style.display = 'inline-block';
    successMessage.style.display = 'none';
    return;
  }

  submitButton.disabled = true;

  fetch(form.action, {
    method: form.method,
    body: formData
  }).then(response => {
    if (!response.ok) {
      submitButton.disabled = false;
      // Em caso de erro na requisição, mostrar o botão enviar e esconder sucesso
      submitButton.style.display = 'inline-block';
      successMessage.style.display = 'none';
      return;
    }
    form.reset();

    // Aqui o sucesso já está visível desde o início, só esperar para resetar
    setTimeout(resetSuccess, 1700);
  }).catch(() => {
    submitButton.disabled = false;
    submitButton.style.display = 'inline-block';
    successMessage.style.display = 'none';
  });
});






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
