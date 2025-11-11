/**
 * Phase [3] — ROI Dashboard Engine
 * Node.js/Express service for CLIMB/Cline
 * Tokenized URL generation using JWT
 * Serves static ProSynth ROI dashboard
 */

const express = require("express");
const jwt = require("jsonwebtoken");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET || "proSynthSecretKey";

app.get("/token", (req, res) => {
  const payload = {
    user: "climb-cline",
    access: "dashboard",
    exp: Math.floor(Date.now() / 1000) + 60 * 60, // 1 hour expiry
  };
  const token = jwt.sign(payload, JWT_SECRET);
  const url = `http://localhost:${PORT}/dashboard?token=${token}`;
  res.json({ token, url });
});

// Middleware to verify JWT token for dashboard access
app.use("/dashboard", (req, res, next) => {
  const token = req.query.token;
  if (!token) return res.status(403).send("Access denied. Token missing.");

  try {
    jwt.verify(token, JWT_SECRET);
    next();
  } catch (err) {
    res.status(401).send("Invalid or expired token.");
  }
});

// Serve static dashboard files after token verification
app.use("/dashboard", express.static(path.join(__dirname, "dashboard")));

// Root route
app.get("/", (req, res) => {
  res.send("ProSynth ROI Dashboard Engine is running.");
});

// Start server
app.listen(PORT, () => {
  console.log(`Dashboard Engine running at http://localhost:${PORT}`);
});
