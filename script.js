document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('formulario-contato');
  const submitButton = document.getElementById('btn-submit');
  const successContainer = document.getElementById('success-message');

  if (!form || !submitButton || !successContainer) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    fetch(form.action, {
      method: form.method,
      body: formData
    }).finally(() => {
      form.reset();
      mostrarSucesso();
    });
  });

  function mostrarSucesso() {
    submitButton.style.display = 'none';
    successContainer.style.display = 'block';

    setTimeout(() => {
      successContainer.style.display = 'none';
      submitButton.style.display = 'inline-block';
    }, 1700);
  }
});
