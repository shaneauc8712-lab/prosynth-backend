// Phase [4] — Secure Access Implementation (CAT Intelligence Synthesizer Execution Layer)
// This script enforces HTTPS, JWT validation, and OAuth access for internal consultants.

import express from "express";
import https from "https";
import fs from "fs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const envFile = process.env.NODE_ENV === "production" ? ".env.production" : ".env";
dotenv.config({ path: envFile });

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.json());

// Load SSL certificates (self-signed or production)
const sslOptions = {
  key: fs.readFileSync(process.env.SSL_KEY_PATH || join(__dirname, "../certs/server.key")),
  cert: fs.readFileSync(process.env.SSL_CERT_PATH || join(__dirname, "../certs/server.crt")),
};

// JWT validation middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Access token required" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid token" });
    req.user = user;
    next();
  });
}

// OAuth simulation for internal consultant access
app.post("/auth/internal", (req, res) => {
  const { username, password } = req.body;
  if (username === process.env.OAUTH_USER && password === process.env.OAUTH_PASS) {
    const token = jwt.sign({ role: "consultant", username }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });
    return res.json({ token });
  }
  res.status(401).json({ error: "Invalid credentials" });
});

// Protected route for dashboard access
app.get("/dashboard/:token", authenticateToken, (req, res) => {
  const dashboardPath = join(__dirname, "../dashboard/index.html");
  res.sendFile(dashboardPath);
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "Phase 4 Secure Access Layer Active" });
});

// Start HTTPS server
const PORT = process.env.PORT || 8443;
https.createServer(sslOptions, app).listen(PORT, () => {
  console.log(`🔐 Secure Access Layer active on https://localhost:${PORT}`);
});
