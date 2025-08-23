process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const nodemailer = require("nodemailer");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const app = express();

// 🔥 CORRECTION CORS - AJOUTEZ CES 3 LIGNES
app.use(cors({
  origin: ["https://solution-frontend-fq8e.vercel.app", "http://localhost:3000"],
  methods: ["GET", "POST", "OPTIONS"],
  credentials: true
}));
app.options('*', cors());

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../frontend/public")));

// 🔥 CORRECTION : "/api/paiement1" au lieu de "/api/payment1"
app.post("/api/paiement1", async (req, res) => {
  const { genre, email, message, date_inscription } = req.body;

  if (!email || !message) {
    return res.status(400).json({ error: "Champs obligatoires manquants." });
  }

  try {
    // Envoi mail admin
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Solution Confidence" <${process.env.GMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: "Formule 1 - Lettre de réponse personnalisée - 1000 FCFA",
      html: `
        <h3>Nouvelle inscription reçue :</h3>
        <ul>
          <li><b>Genre :</b> ${genre}</li>
          <li><b>Email :</b> ${email}</li>
          <li><b>Message :</b> ${message}</li>
          <li><b>Date :</b> ${date_inscription}</li>
        </ul>
      `,
    });

    // 🔥 CORRECTION : Prix à 1000 FCFA au lieu de 5000
    const paytechData = {
      item_name: "Formule 1 - Lettre réponse personnalisée",
      item_price: 1000,
      currency: "XOF",
      ref_command: "CMD1_" + Date.now(),
      command_name: "Formule 1 - Solution Confidence",
      env: "test",

      // 🔥 CORRECTION : URLs de redirection
      success_url: "https://solution-frontend-fq8e.vercel.app/success.html",
      cancel_url: "https://solution-frontend-fq8e.vercel.app/cancel.html",
      ipn_url: "https://solution-backend-2.onrender.com/api/ipn",

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
      return res.status(200).json({ 
        success: true, 
        paymentUrl: response.data.redirect_url 
      });
    } else {
      return res.status(500).json({ error: "Réponse invalide de PayTech." });
    }
  } catch (error) {
    console.error("Erreur PayTech:", error.message);
    res.status(500).json({ error: "Erreur lors de la création du paiement." });
  }
});

// 🔥 CORRECTION : "/api/paiement2" et prix à 1500 FCFA
app.post("/api/paiement2", async (req, res) => {
  const { genre, email, message, date_inscription } = req.body;

  if (!email || !message) {
    return res.status(400).json({ error: "Champs obligatoires manquants." });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Solution Confidence" <${process.env.GMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: "Formule 2 - Suivi fraternel - 1500 FCFA",
      html: `
        <h3>Nouvelle inscription reçue :</h3>
        <ul>
          <li><b>Genre :</b> ${genre}</li>
          <li><b>Email :</b> ${email}</li>
          <li><b>Message :</b> ${message}</li>
          <li><b>Date :</b> ${date_inscription}</li>
        </ul>
      `,
    });

    const paytechData = {
      item_name: "Formule 2 - Suivi fraternel",
      item_price: 1500,
      currency: "XOF",
      ref_command: "CMD2_" + Date.now(),
      command_name: "Formule 2 - Solution Confidence",
      env: "test",
      success_url: "https://solution-frontend-fq8e.vercel.app/success.html",
      cancel_url: "https://solution-frontend-fq8e.vercel.app/cancel.html",
      ipn_url: "https://solution-backend-2.onrender.com/api/ipn",
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
      return res.status(200).json({ 
        success: true, 
        paymentUrl: response.data.redirect_url 
      });
    } else {
      return res.status(500).json({ error: "Réponse invalide de PayTech." });
    }
  } catch (error) {
    console.error("Erreur PayTech:", error.message);
    res.status(500).json({ error: "Erreur lors de la création du paiement." });
  }
});

// 🔥 CORRECTION : "/api/paiement3" et prix à 2000 FCFA
app.post("/api/paiement3", async (req, res) => {
  const { genre, email, message, date_inscription } = req.body;

  if (!email || !message) {
    return res.status(400).json({ error: "Champs obligatoires manquants." });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Solution Confidence" <${process.env.GMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: "Formule 3 - Réponse prioritaire - 2000 FCFA",
      html: `
        <h3>Nouvelle inscription reçue :</h3>
        <ul>
          <li><b>Genre :</b> ${genre}</li>
          <li><b>Email :</b> ${email}</li>
          <li><b>Message :</b> ${message}</li>
          <li><b>Date :</b> ${date_inscription}</li>
        </ul>
      `,
    });

    const paytechData = {
      item_name: "Formule 3 - Réponse prioritaire",
      item_price: 2000,
      currency: "XOF",
      ref_command: "CMD3_" + Date.now(),
      command_name: "Formule 3 - Solution Confidence",
      env: "test",
      success_url: "https://solution-frontend-fq8e.vercel.app/success.html",
      cancel_url: "https://solution-frontend-fq8e.vercel.app/cancel.html",
      ipn_url: "https://solution-backend-2.onrender.com/api/ipn",
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
      return res.status(200).json({ 
        success: true, 
        paymentUrl: response.data.redirect_url 
      });
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
