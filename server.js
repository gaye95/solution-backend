process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const nodemailer = require("nodemailer");
const path = require("path");
require("dotenv").config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../frontend/public")));

app.post("/api/payment1", async (req, res) => {
  const { genre, email, message, date_inscription } = req.body;

  if (!email || !message) {
    return res.status(400).json({ error: "Champs obligatoires manquants." });
  }

  try {
    // Envoi mail admin (optionnel)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Inscription" <${process.env.GMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject:
        "Formule 1 (Lettre de réponse personnalisée) 1000 FCFA. Réponse soignée, conseils adaptés à la situation",
      html: `
        <h3>Nouvelle inscription reçue :</h3>
        <ul>
          <li><b>Genre :</b> ${genre}</li>
          <li><b>Email :</b> ${email}</li>
          <li><b>message :</b> ${message}</li>
          <li><b>Date :</b> ${date_inscription}</li>
        </ul>
      `,
    });

    // Préparer la requête PayTech
    const paytechData = {
      item_name: "Inscription Événement",
      item_price: 5000,
      currency: "XOF",
      ref_command: "CMD_" + Date.now(),
      command_name: "Paiement inscription",
      env: "test", // changer en "prod" en production

      // Redirections
      success_url: "https://tonsite.com/success.html",
      cancel_url: "https://tonsite.com/cancel.html",
      ipn_url: "https://tonsite.com/ipn",

      // Données client
      customer_email: email,
      customer_message: message,
    };

    const headers = {
      "Content-Type": "application/json",
      API_KEY: process.env.PAYTECH_API_KEY,
      API_SECRET: process.env.PAYTECH_API_SECRET,
    };

    const response = await axios.post(
      "https://paytech.sn/api/payment/request-payment",
      paytechData,
      { headers }
    );

    if (response.data && response.data.redirect_url) {
      return res.status(200).json({ redirect_url: response.data.redirect_url });
    } else {
      return res.status(500).json({ error: "Réponse invalide de PayTech." });
    }
  } catch (error) {
    console.error("Erreur PayTech:", error.message);
    res.status(500).json({ error: "Erreur lors de la création du paiement." });
  }
});

app.post("/api/payment2", async (req, res) => {
  const { genre, email, message, date_inscription } = req.body;

  if (!email || !message) {
    return res.status(400).json({ error: "Champs obligatoires manquants." });
  }

  try {
    // Envoi mail admin (optionnel)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Inscription" <${process.env.GMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject:
        "Suivi fraternel (2e réponse pour continuer l’echange sur la meme situation) 1500 FCFA",
      html: `
        <h3>Nouvelle inscription reçue :</h3>
        <ul>
          <li><b>Genre :</b> ${genre}</li>
          <li><b>Email :</b> ${email}</li>
          <li><b>message :</b> ${message}</li>
          <li><b>Date :</b> ${date_inscription}</li>
        </ul>
      `,
    });

    // Préparer la requête PayTech
    const paytechData = {
      item_name: "Inscription Événement",
      item_price: 5000,
      currency: "XOF",
      ref_command: "CMD_" + Date.now(),
      command_name: "Paiement inscription",
      env: "test", // changer en "prod" en production

      // Redirections
      success_url: "https://tonsite.com/success.html",
      cancel_url: "https://tonsite.com/cancel.html",
      ipn_url: "https://tonsite.com/ipn",

      // Données client
      customer_email: email,
      customer_message: message,
    };

    const headers = {
      "Content-Type": "application/json",
      API_KEY: process.env.PAYTECH_API_KEY,
      API_SECRET: process.env.PAYTECH_API_SECRET,
    };

    const response = await axios.post(
      "https://paytech.sn/api/payment/request-payment",
      paytechData,
      { headers }
    );

    if (response.data && response.data.redirect_url) {
      return res.status(200).json({ redirect_url: response.data.redirect_url });
    } else {
      return res.status(500).json({ error: "Réponse invalide de PayTech." });
    }
  } catch (error) {
    console.error("Erreur PayTech:", error.message);
    res.status(500).json({ error: "Erreur lors de la création du paiement." });
  }
});

app.post("/api/payment3", async (req, res) => {
  const { genre, email, message, date_inscription } = req.body;

  if (!email || !message) {
    return res.status(400).json({ error: "Champs obligatoires manquants." });
  }

  try {
    // Envoi mail admin (optionnel)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Inscription" <${process.env.GMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: "Formule 3Réponse prioritaire (moins de 12h) 2000 FCFA",
      html: `
        <h3>Nouvelle inscription reçue :</h3>
        <ul>
          <li><b>Genre :</b> ${genre}</li>
          <li><b>Email :</b> ${email}</li>
          <li><b>message :</b> ${message}</li>
          <li><b>Date :</b> ${date_inscription}</li>
        </ul>
      `,
    });

    // Préparer la requête PayTech
    const paytechData = {
      item_name: "Inscription Événement",
      item_price: 5000,
      currency: "XOF",
      ref_command: "CMD_" + Date.now(),
      command_name: "Paiement inscription",
      env: "test", // changer en "prod" en production

      // Redirections
      success_url: "https://tonsite.com/success.html",
      cancel_url: "https://tonsite.com/cancel.html",
      ipn_url: "https://tonsite.com/ipn",

      // Données client
      customer_email: email,
      customer_message: message,
    };

    const headers = {
      "Content-Type": "application/json",
      API_KEY: process.env.PAYTECH_API_KEY,
      API_SECRET: process.env.PAYTECH_API_SECRET,
    };

    const response = await axios.post(
      "https://paytech.sn/api/payment/request-payment",
      paytechData,
      { headers }
    );

    if (response.data && response.data.redirect_url) {
      return res.status(200).json({ redirect_url: response.data.redirect_url });
    } else {
      return res.status(500).json({ error: "Réponse invalide de PayTech." });
    }
  } catch (error) {
    console.error("Erreur PayTech:", error.message);
    res.status(500).json({ error: "Erreur lors de la création du paiement." });
  }
});

// Serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
