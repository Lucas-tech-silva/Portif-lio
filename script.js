document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('formulario-contato');
  const submitButton = document.getElementById('btn-submit');
  const successMessage = document.getElementById('success-message');

  if (!form || !submitButton || !successMessage) return;

  form.addEventListener('submit', function (event) {
    event.preventDefault(); // Impede o comportamento padrão (NÃO atualiza a página)

    const formData = new FormData(form);

    fetch(form.action, {
      method: form.method,
      body: formData
    })
      .then(response => {
        if (!response.ok) throw new Error('Erro no envio');

        form.reset(); // Limpa o formulário
        submitButton.style.display = 'none'; // Esconde o botão enviar
        successMessage.style.display = 'block'; // Exibe o botão de sucesso

        setTimeout(() => {
          successMessage.style.display = 'none'; // Esconde o botão de sucesso
          submitButton.style.display = 'inline-block'; // Mostra o botão enviar novamente
        }, 1700);
      })
      .catch(() => {
        alert('Erro ao enviar. Tente novamente.');
      });
  });
});
