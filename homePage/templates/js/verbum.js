// Interações visuais simples. A autenticação real deve continuar no Django.
const password = document.querySelector('#password');
const togglePassword = document.querySelector('#toggle-password');

if (password && togglePassword) {
  togglePassword.addEventListener('click', () => {
    const isVisible = password.type === 'text';
    password.type = isVisible ? 'password' : 'text';
    togglePassword.textContent = isVisible ? 'Mostrar' : 'Ocultar';
  });
}

const startLesson = document.querySelector('#start-lesson');

if (startLesson) {
  startLesson.addEventListener('click', () => {
    startLesson.textContent = 'Atividade selecionada ✓';
  });
}
