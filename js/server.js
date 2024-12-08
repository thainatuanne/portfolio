emailjs.init("qKiTxfXrACBOPN8Vd");

document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const feedbackMessage = document.getElementById("feedback-message");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    feedbackMessage.textContent =
      "Email inválido. Por favor, insira um email válido.";
    feedbackMessage.style.color = "#F64740";
    return;
  }

  if (message.length === 0) {
    feedbackMessage.textContent =
      "Mensagem inválida. Por favor, insira uma mensagem.";
    feedbackMessage.style.color = "#F64740";
    return;
  }

  const serviceID = "service_4kd21r4";
  const templateID = "template_tf306zn";

  const templateParams = {
    user_email: email,
    user_message: message,
  };

  emailjs.send(serviceID, templateID, templateParams).then(
    (response) => {
      feedbackMessage.textContent = "Email enviado com sucesso!";
      feedbackMessage.style.color = "#2ecc71";
      console.log(
        "Mensagem enviada com sucesso!",
        response.status,
        response.text
      );
      document.getElementById("contactForm").reset();
    },
    (error) => {
      feedbackMessage.textContent = "Erro ao enviar email. Tente novamente.";
      feedbackMessage.style.color = "#F64740";
      console.error("Erro ao enviar email:", error);
    }
  );
});