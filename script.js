document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('formulario-contato');
  const submitButton = document.getElementById('btn-submit');
  const successMessage = document.getElementById('success-message');

  if (!form || !submitButton || !successMessage) return;

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(form);

    fetch(form.action, {
      method: form.method,
      body: formData
    }).finally(() => {
      form.reset(); // Limpa o formulário

      // Exibe o botão de sucesso
      successMessage.style.display = 'flex'; // <<<<< ALTEREI PARA 'flex' para garantir exibição no mobile
      successMessage.style.justifyContent = 'center'; // centraliza se necessário
      successMessage.style.alignItems = 'center'; // centraliza se necessário
      submitButton.style.display = 'none'; // Esconde o botão enviar

      setTimeout(() => {
        successMessage.style.display = 'none'; // Esconde o botão de sucesso depois de 1.7s
        submitButton.style.display = 'inline-block'; // Mostra o botão enviar novamente
      }, 1700);
    });
  });
});
