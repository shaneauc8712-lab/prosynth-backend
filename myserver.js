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

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ROI computation endpoint (moved before dashboard middleware)
app.post("/api/roi/compute", (req, res) => {
  const { params } = req.body || {};
  if (!params) {
    return res.status(400).json({ error: "Missing params in request body" });
  }

  // Simulated ROI computation logic
  const roiScore = Math.random().toFixed(2);
  const dashboardUrl = `https://prosynth-dashboard.netlify.app/dashboard?roi=${roiScore}`;

  res.json({
    dashboard_url: dashboardUrl,
    roiScore: parseFloat(roiScore),
    message: "ROI computation successful",
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
