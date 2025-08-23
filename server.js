process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

const app = express();

// 🔥 CONFIGURATION DU NOUVEAU DOMAINE
const MAIN_DOMAIN = "https://www.omar-gaye-portfolio.shop";

// 🔥 MIDDLEWARES ESSENTIELS
// 🔥 REMPLACEZ TOUTE LA CONFIGURATION CORS PAR CE CODE :
app.use(cors({
  origin: [
    "https://www.omar-gaye-portfolio.shop",    // Nouveau domaine
    "https://omar-gaye-portfolio.shop",        // Sans www
    "https://solution-frontend-fq8e.vercel.app", // ANCIEN DOMAINE VERCEL (important !)
    "http://localhost:3000",                   // Dev local
    "http://localhost:3001"                    // Dev local
  ],
  methods: ["GET", "POST", "OPTIONS", "PUT", "DELETE"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization", "API_KEY", "API_SECRET"]
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 🔥 ROUTE TEST pour vérifier que le serveur fonctionne
app.get("/", (req, res) => {
  res.json({ 
    message: "✅ Backend Solution Confidence is running!",
    domain: MAIN_DOMAIN,
    timestamp: new Date().toISOString(),
    status: "OK"
  });
});

// 🔥 ROUTE PAIEMENT 1 - 1000 FCFA
app.post("/api/paiement1", async (req, res) => {
  console.log("📥 Requête reçue sur /api/paiement1");
  
  const { genre, email, message, date_inscription } = req.body;

  if (!email || !message) {
    return res.status(400).json({ 
      success: false,
      error: "Email et message sont obligatoires." 
    });
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
        <h3>Nouvelle inscription Formule 1 :</h3>
        <ul>
          <li><b>Genre :</b> ${genre || 'Non spécifié'}</li>
          <li><b>Email :</b> ${email}</li>
          <li><b>Message :</b> ${message}</li>
          <li><b>Date :</b> ${date_inscription || new Date().toLocaleString('fr-FR')}</li>
          <li><b>Domaine :</b> ${MAIN_DOMAIN}</li>
        </ul>
      `,
    });

    // Configuration PayTech
    const paytechData = {
      item_name: "Formule 1 - Lettre réponse personnalisée",
      item_price: 1000,
      currency: "XOF",
      ref_command: "CMD1_" + Date.now(),
      command_name: "Solution Confidence - Formule 1",
      env: "test",

      // 🔥 URLs DE REDIRECTION AVEC NOUVEAU DOMAINE
      success_url: `${MAIN_DOMAIN}/success.html`,
      cancel_url: `${MAIN_DOMAIN}/cancel.html`,
      ipn_url: "https://solution-backend-2.onrender.com/api/ipn",

      customer_email: email,
      customer_message: message.substring(0, 255),
    };

    const headers = {
      "Content-Type": "application/json",
      "API_KEY": process.env.PAYTECH_API_KEY,
      "API_SECRET": process.env.PAYTECH_API_SECRET,
    };

    const response = await axios.post(
      "https://paytech.sn/api/payment/request-payment",
      paytechData,
      { 
        headers,
        timeout: 10000
      }
    );

    if (response.data && response.data.redirect_url) {
      console.log("✅ Paiement créé avec succès");
      return res.status(200).json({ 
        success: true, 
        paymentUrl: response.data.redirect_url,
        message: "Redirection vers PayTech"
      });
    } else {
      console.error("❌ Réponse invalide de PayTech:", response.data);
      return res.status(500).json({ 
        success: false,
        error: "Réponse invalide du service de paiement." 
      });
    }
  } catch (error) {
    console.error("❌ Erreur PayTech:", error.message);
    if (error.response) {
      console.error("Détails erreur:", error.response.data);
    }
    
    res.status(500).json({ 
      success: false,
      error: "Erreur lors de la création du paiement. Veuillez réessayer.",
      details: process.env.NODE_ENV === "development" ? error.message : undefined
    });
  }
});

// 🔥 ROUTE PAIEMENT 2 - 1500 FCFA
app.post("/api/paiement2", async (req, res) => {
  console.log("📥 Requête reçue sur /api/paiement2");
  
  const { genre, email, message, date_inscription } = req.body;

  if (!email || !message) {
    return res.status(400).json({ 
      success: false,
      error: "Email et message sont obligatoires." 
    });
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
        <h3>Nouvelle inscription Formule 2 :</h3>
        <ul>
          <li><b>Genre :</b> ${genre || 'Non spécifié'}</li>
          <li><b>Email :</b> ${email}</li>
          <li><b>Message :</b> ${message}</li>
          <li><b>Date :</b> ${date_inscription || new Date().toLocaleString('fr-FR')}</li>
          <li><b>Domaine :</b> ${MAIN_DOMAIN}</li>
        </ul>
      `,
    });

    const paytechData = {
      item_name: "Formule 2 - Suivi fraternel",
      item_price: 1500,
      currency: "XOF",
      ref_command: "CMD2_" + Date.now(),
      command_name: "Solution Confidence - Formule 2",
      env: "test",
      
      // 🔥 URLs DE REDIRECTION AVEC NOUVEAU DOMAINE
      success_url: `${MAIN_DOMAIN}/success.html`,
      cancel_url: `${MAIN_DOMAIN}/cancel.html`,
      ipn_url: "https://solution-backend-2.onrender.com/api/ipn",
      
      customer_email: email,
      customer_message: message.substring(0, 255),
    };

    const headers = {
      "Content-Type": "application/json",
      "API_KEY": process.env.PAYTECH_API_KEY,
      "API_SECRET": process.env.PAYTECH_API_SECRET,
    };

    const response = await axios.post(
      "https://paytech.sn/api/payment/request-payment",
      paytechData,
      { 
        headers,
        timeout: 10000
      }
    );

    if (response.data && response.data.redirect_url) {
      return res.status(200).json({ 
        success: true, 
        paymentUrl: response.data.redirect_url 
      });
    } else {
      return res.status(500).json({ 
        success: false,
        error: "Réponse invalide du service de paiement." 
      });
    }
  } catch (error) {
    console.error("Erreur PayTech formule 2:", error.message);
    res.status(500).json({ 
      success: false,
      error: "Erreur lors de la création du paiement." 
    });
  }
});

// 🔥 ROUTE PAIEMENT 3 - 2000 FCFA
app.post("/api/paiement3", async (req, res) => {
  console.log("📥 Requête reçue sur /api/paiement3");
  
  const { genre, email, message, date_inscription } = req.body;

  if (!email || !message) {
    return res.status(400).json({ 
      success: false,
      error: "Email et message sont obligatoires." 
    });
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
        <h3>Nouvelle inscription Formule 3 :</h3>
        <ul>
          <li><b>Genre :</b> ${genre || 'Non spécifié'}</li>
          <li><b>Email :</b> ${email}</li>
          <li><b>Message :</b> ${message}</li>
          <li><b>Date :</b> ${date_inscription || new Date().toLocaleString('fr-FR')}</li>
          <li><b>Domaine :</b> ${MAIN_DOMAIN}</li>
        </ul>
      `,
    });

    const paytechData = {
      item_name: "Formule 3 - Réponse prioritaire",
      item_price: 2000,
      currency: "XOF",
      ref_command: "CMD3_" + Date.now(),
      command_name: "Solution Confidence - Formule 3",
      env: "test",
      
      // 🔥 URLs DE REDIRECTION AVEC NOUVEAU DOMAINE
      success_url: `${MAIN_DOMAIN}/success.html`,
      cancel_url: `${MAIN_DOMAIN}/cancel.html`,
      ipn_url: "https://solution-backend-2.onrender.com/api/ipn",
      
      customer_email: email,
      customer_message: message.substring(0, 255),
    };

    const headers = {
      "Content-Type": "application/json",
      "API_KEY": process.env.PAYTECH_API_KEY,
      "API_SECRET": process.env.PAYTECH_API_SECRET,
    };

    const response = await axios.post(
      "https://paytech.sn/api/payment/request-payment",
      paytechData,
      { 
        headers,
        timeout: 10000
      }
    );

    if (response.data && response.data.redirect_url) {
      return res.status(200).json({ 
        success: true, 
        paymentUrl: response.data.redirect_url 
      });
    } else {
      return res.status(500).json({ 
        success: false,
        error: "Réponse invalide du service de paiement." 
      });
    }
  } catch (error) {
    console.error("Erreur PayTech formule 3:", error.message);
    res.status(500).json({ 
      success: false,
      error: "Erreur lors de la création du paiement." 
    });
  }
});

// 🔥 ROUTE IPN (Optional - pour les retours PayTech)
app.post("/api/ipn", (req, res) => {
  console.log("📨 IPN reçu:", req.body);
  res.status(200).send("IPN received");
});

// 🔥 GESTION DES ERREURS 404
app.use((req, res) => {
  res.status(404).json({ 
    success: false,
    error: "Route non trouvée" 
  });
});

// 🔥 GESTION DES ERREURS GLOBALES
app.use((error, req, res, next) => {
  console.error("💥 Erreur globale:", error);
  res.status(500).json({ 
    success: false,
    error: "Erreur interne du serveur" 
  });
});

// 🚀 DÉMARRAGE DU SERVEUR
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Serveur démarré sur le port ${PORT}`);
  console.log(`📍 URL: http://localhost:${PORT}`);
  console.log(`🌐 Domaine frontend: ${MAIN_DOMAIN}`);
  console.log(`⚙️ Environnement: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;
