// ✅ Full Working index.js with frontend + backend mail system const express = require("express"); const mongoose = require("mongoose"); const bodyParser = require("body-parser"); const cors = require("cors"); const path = require("path");

const app = express(); const PORT = process.env.PORT || 3000;

// MongoDB connection mongoose.connect("mongodb+srv://<your_mongodb_connection>", { useNewUrlParser: true, useUnifiedTopology: true, });

const db = mongoose.connection; db.on("error", console.error.bind(console, "connection error:")); db.once("open", () => { console.log("✅ MongoDB connected"); });

// Mail Schema const MailSchema = new mongoose.Schema({ email: String, subject: String, body: String, time: { type: Date, default: Date.now }, });

const Mail = mongoose.model("Mail", MailSchema);

// Middleware app.use(cors()); app.use(bodyParser.json()); app.use(express.static("public"));

// Frontend serve app.get("/", (req, res) => { res.sendFile(path.join(__dirname, "public", "index.html")); });

// API to store mails app.post("/api/mail", async (req, res) => { const { email, subject, body } = req.body; const mail = new Mail({ email, subject, body }); await mail.save(); res.json({ success: true, message: "Mail stored" }); });

// API to fetch all mails app.get("/api/mail", async (req, res) => { const mails = await Mail.find().sort({ time: -1 }); res.json(mails); });

app.listen(PORT, () => { console.log(🚀 Server running on port ${PORT}); });
