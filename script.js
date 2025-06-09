document.addEventListener('DOMContentLoaded', function() {

  const form = document.getElementById('formulario-contato');
  const successMessage = document.getElementById('success-message');

  if (form) {
    form.addEventListener('submit', async function(e) {
      e.preventDefault(); 

      const button = this.querySelector('button[type="submit"]');
      const originalHTML = button.innerHTML;

      button.disabled = true;
      button.innerHTML = 'Enviando... <i class="fas fa-spinner fa-spin"></i>';

      const formData = new FormData(form);

      try {
        const response = await fetch(form.action, {
          method: form.method,
          body: formData,
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          if (successMessage) {
            successMessage.style.display = 'flex';
            setTimeout(() => {
              successMessage.style.display = 'none';
            }, 5000);
          }

          button.innerHTML = '<i class="fas fa-check"></i> Mensagem Enviada!';
          form.reset();

          setTimeout(() => {
            button.innerHTML = originalHTML;
            button.disabled = false;
          }, 3000);

        } else {
          alert('Erro ao enviar a mensagem. Tente novamente.');
          button.innerHTML = originalHTML;
          button.disabled = false;
        }
      } catch (error) {
        alert('Erro de conexão. Tente novamente mais tarde.');
        button.innerHTML = originalHTML;
        button.disabled = false;
      }
    });
  }

  const animateOnScroll = function() {
    const elements = document.querySelectorAll('.skill-card, .project-card, .about-content > div, .contact-wrapper, .section-title');

    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (elementPosition < windowHeight - 100) {
        element.classList.add('fade-in');
      }
    });
  };

  document.querySelectorAll('.skill-card, .project-card, .about-content > div, .contact-wrapper, .section-title').forEach(el => {
    el.classList.add('animate-on-scroll');
  });

  animateOnScroll();
  window.addEventListener('scroll', animateOnScroll);

  const navbar = document.querySelector('.navbar');
  const burger = document.querySelector('.burger');
  const navLinks = document.querySelector('.nav-links');
  const navItems = document.querySelectorAll('.nav-links li');
  const sections = document.querySelectorAll('section');

  burger.addEventListener('click', () => {
    navLinks.classList.toggle('nav-active');
    burger.classList.toggle('toggle');
    document.body.classList.toggle('no-scroll');
  });

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      if (navLinks.classList.contains('nav-active')) {
        navLinks.classList.remove('nav-active');
        burger.classList.remove('toggle');
        document.body.classList.remove('no-scroll');
      }
    });
  });

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').substring(1) === current) {
        link.classList.add('active');
      }
    });
  });

  const observerOptions = {
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.target.classList.contains('skill-card')) {
        const progressBar = entry.target.querySelector('.skill-progress');
        if (progressBar) {
          const width = progressBar.getAttribute('data-width') || progressBar.style.width;
          progressBar.style.width = '0';
          setTimeout(() => {
            progressBar.style.width = width;
          }, 200);
        }
      }
    });
  }, observerOptions);

  document.querySelectorAll('.skill-card').forEach(card => {
    const progressBar = card.querySelector('.skill-progress');
    if (progressBar) {
      progressBar.setAttribute('data-width', progressBar.style.width);
      progressBar.style.width = '0';
      observer.observe(card);
    }
  });
});
