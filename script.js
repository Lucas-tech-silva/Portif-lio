document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('formulario-contato');
  const submitButton = document.getElementById('btn-submit');
  const successMessageContainer = document.getElementById('success-message');
  const successButton = successMessageContainer.querySelector('.btn-success');

  if (!form || !submitButton || !successMessageContainer || !successButton) return;

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(form);

    fetch(form.action, {
      method: form.method,
      body: formData
    }).finally(() => {
      form.reset(); // Limpa o formulário

      // Garante que o botão realmente apareça:
      successMessageContainer.style.display = 'block'; // Exibe a div
      successButton.style.display = 'inline-flex'; // Exibe o botão dentro dela

      submitButton.style.display = 'none'; // Esconde o botão enviar

      setTimeout(() => {
        successMessageContainer.style.display = 'none'; // Esconde tudo de novo
        submitButton.style.display = 'inline-block'; // Mostra o botão enviar novamente
      }, 1700);
    });
  });
});
