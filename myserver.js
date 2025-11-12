/**
 * Phase 3 — Deploy Dashboard Engine
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
  const url = `https://prosynth-dashboard.netlify.app/dashboard?token=${token}`;
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

// Parse JSON before defining routes
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Debug middleware to log all routes
app.use((req, res, next) => {
  console.log("Incoming request:", req.method, req.originalUrl);
  next();
});

// Direct ROI endpoint (ensure registered before 404 handler)
app.post("/api/roi/calculate", (req, res) => {
  console.log("ROI /api/roi/calculate endpoint hit");
  res.status(200).json({
    message: "ROI endpoint reachable",
    data: req.body,
  });
});

// Root route
app.get("/", (req, res) => {
  res.send("ProSynth ROI API and Dashboard Engine are running.");
});

// Fallback for unmatched routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found", path: req.originalUrl });
});

// Start server
app.listen(PORT, () => {
  console.log(`ProSynth ROI API running on port ${PORT}`);
});
