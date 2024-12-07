const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");
const validator = require("validator");
const path = require("path");

require("dotenv").config();

const app = express();
const port = 3000;

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname)));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/send-email", (req, res) => {
  let { email, message } = req.body;

  if (!validator.isEmail(email)) {
    console.log("Email inválido.");
    return res.status(400).json({
      status: "error",
      message: "Email inválido. Por favor, insira um email válido.",
    });
  }
  if (!message || message.trim().length === 0) {
    console.log("Mensagem inválida.");
    return res.status(400).json({
      status: "error",
      message: "Mensagem inválida. Por favor, insira uma mensagem.",
    });
  }

  email = validator.normalizeEmail(email);
  message = validator.escape(message);

  const mailOptions = {
    from: email,
    to: process.env.EMAIL,
    subject: `Novo contato de ${email}`,
    text: `Mensagem recebida:\n\n${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Erro ao enviar email:", error.message);
      return res.status(500).json({
        status: "error",
        message: "Erro ao enviar email. Tente novamente mais tarde.",
      });
    } else {
      console.log("Email enviado:", info.response);
      return res.status(200).json({
        status: "success",
        message: "Email enviado com sucesso!",
      });
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
