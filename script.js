
document.addEventListener('DOMContentLoaded', () => {
  initContactForm();
  // se quiser, pode chamar suas outras funções aqui
});

function initContactForm() {
  const form = document.getElementById('formulario-contato');
  const submitButton = document.getElementById('btn-submit');
  const successMessage = document.getElementById('success-message');

  if (!form || !submitButton || !successMessage) return;

  function createErrorMessage(field, message) {
    let error = field.parentNode.querySelector('.error-message');
    if (!error) {
      error = document.createElement('div');
      error.className = 'error-message';
      error.style.color = '#ff4d4f';
      error.style.fontSize = '0.85em';
      error.style.marginTop = '4px';
      error.style.fontWeight = '500';
      field.parentNode.appendChild(error);
    }
    error.textContent = message;
  }

  function clearErrors() {
    const errors = form.querySelectorAll('.error-message');
    errors.forEach(err => err.remove());
  }

  form.querySelectorAll('input, textarea').forEach(field => {
    field.addEventListener('input', () => {
      const error = field.parentNode.querySelector('.error-message');
      if (error) error.remove();
      field.style.borderColor = '';

      if (successMessage.classList.contains('show')) {
        successMessage.classList.remove('show');
        submitButton.style.display = 'inline-block';
        submitButton.disabled = false;
      }
    });
  });

  form.addEventListener('submit', function(event) {
    event.preventDefault();

    if (submitButton.disabled) return;

    clearErrors();

    const formData = new FormData(form);
    let firstErrorField = null;
    let hasError = false;

    for (const [name, value] of formData.entries()) {
      const field = form.querySelector(`[name="${name}"]`);
      if (!value.trim()) {
        hasError = true;
        let message = 'Este campo é obrigatório.';
        if (name === 'name') message = 'Digite seu nome completo.';
        else if (name === 'email') message = 'Digite o seu e-mail.';
        else if (name === 'subject') message = 'Digite o assunto que deseja tratar.';
        else if (name === 'message') message = 'Por favor, escreva a sua mensagem.';
        createErrorMessage(field, message);
        field.style.borderColor = '#ff4d4f';
        if (!firstErrorField) firstErrorField = field;
      } else if (name === 'email' && !/^\S+@\S+\.\S+$/.test(value)) {
        hasError = true;
        createErrorMessage(field, 'Ops! Parece que o e-mail está inválido.');
        field.style.borderColor = '#ff4d4f';
        if (!firstErrorField) firstErrorField = field;
      }
    }

    if (hasError) {
      firstErrorField.focus();
      return;
    }

    submitButton.disabled = true;

    fetch(form.action, {
      method: form.method,
      body: formData
    }).then(response => {
      if (!response.ok) return;

      form.reset();
      submitButton.style.display = 'none';
      successMessage.classList.add('show');

      // Faz scroll para mensagem ficar visível no mobile
      successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

      setTimeout(() => {
        successMessage.classList.remove('show');
        submitButton.style.display = 'inline-block';
        submitButton.disabled = false;
      }, 1700);
    }).catch(() => {
      submitButton.disabled = false;
    });
  });
}
