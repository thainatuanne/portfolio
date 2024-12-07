document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const feedbackMessage = document.getElementById("feedback-message");

  if (form) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const formData = new FormData(form);
      const data = Object.fromEntries(formData);

      if (feedbackMessage) {
        feedbackMessage.textContent = "Enviando mensagem...";
        feedbackMessage.style.color = "#DBDBDB";
      }

      try {
        const response = await fetch("https://portfolio-gbhn7l5p8-thainas-projects-5785f71e.vercel.app", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        const result = await response.json();

        if (feedbackMessage) {
          if (result.status === "success") {
            feedbackMessage.textContent = "Mensagem enviada com sucesso!";
            feedbackMessage.style.color = "#C4D6B0";
            form.reset();
          } else {
            feedbackMessage.textContent =
              result.message || "Erro ao enviar a mensagem.";
            feedbackMessage.style.color = "#F64740";
          }
        }
      } catch (error) {
        if (feedbackMessage) {
          feedbackMessage.textContent =
            "Erro ao enviar a mensagem. Tente novamente.";
          feedbackMessage.style.color = "#F64740";
        }
        console.error("Erro:", error);
      }

      if (feedbackMessage) {
        setTimeout(() => {
          feedbackMessage.textContent = "";
        }, 2000);
      }
    });
  } else {
    console.error("Formulário não encontrado.");
  }
});
