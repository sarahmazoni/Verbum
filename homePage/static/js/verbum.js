
// Mostrar ou ocultar a senha
const password = document.querySelector("#password");
const togglePassword = document.querySelector("#toggle-password");

if (password && togglePassword) {
  togglePassword.addEventListener("click", () => {
    const isVisible = password.type === "text";

    password.type = isVisible ? "password" : "text";
    togglePassword.textContent = isVisible ? "Mostrar" : "Ocultar";

    // Ajuda leitores de tela
    togglePassword.setAttribute(
      "aria-pressed",
      String(!isVisible)
    );
  });
}

// Botão para iniciar uma atividade
const startLesson = document.querySelector("#start-lesson");

if (startLesson) {
  startLesson.addEventListener("click", () => {
    startLesson.textContent = "Atividade selecionada ✓";
    startLesson.classList.add("selected");
  });
}