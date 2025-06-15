document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('formulario-contato');
  const submitButton = document.getElementById('btn-submit');
  const successMessageContainer = document.getElementById('success-message');

  if (!form || !submitButton || !successMessageContainer) return;

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(form);

    fetch(form.action, {
      method: form.method,
      body: formData
    }).finally(() => {
      form.reset(); // Limpa o formulário
      submitButton.style.display = 'none'; // Esconde o botão enviar

      // 👉 Forçando a aparição corretamente
      successMessageContainer.style.display = 'block'; // Exibe a div
      successMessageContainer.style.visibility = 'visible'; // Garante visibilidade
      successMessageContainer.style.opacity = '1'; // Garante visibilidade (caso tenha animações)
      successMessageContainer.style.position = 'relative'; // Garante que ocupe espaço
      successMessageContainer.style.height = 'auto'; // Evita altura zero
      successMessageContainer.style.textAlign = 'center'; // Centraliza o botão dentro

      setTimeout(() => {
        successMessageContainer.style.display = 'none'; // Esconde tudo depois de 1.7 segundos
        submitButton.style.display = 'inline-block'; // Mostra o botão enviar novamente
      }, 1700);
    });
  });
});
