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
      submitButton.style.display = 'none';

      // ✅ Adiciona a classe .show que já está configurada no seu CSS
      successContainer.classList.add('show');

      setTimeout(() => {
        successContainer.classList.remove('show');
        submitButton.style.display = 'inline-block';
      }, 1700);
    });
  });
});
