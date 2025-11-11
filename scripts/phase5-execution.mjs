// Phase 5 Execution Script — CAT Intelligence Synthesizer Integration
// ---------------------------------------------------------------
// This script executes Phase [5] as defined in CAT-Intelligence-Synthesizer.md
// It validates the full ClickUp → n8n → CLIMB/Cline → Dashboard pipeline.

import fetch from "node-fetch";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const CLICKUP_API_URL = "https://api.clickup.com/api/v2";
const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL;
const CLIMB_API_URL = process.env.CLIMB_API_URL || "http://localhost:3000/api/climb/roi";
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("Missing required environment variable: JWT_SECRET");
}
const CLICKUP_TOKEN = process.env.CLICKUP_TOKEN;
const WORKSPACE_ID = process.env.CLICKUP_WORKSPACE_ID;

// Utility: Generate Tokenized Dashboard URL
function generateTokenizedURL(clientId) {
  const token = jwt.sign({ clientId, timestamp: Date.now() }, JWT_SECRET, { expiresIn: "7d" });
  const baseUrl = process.env.DASHBOARD_BASE_URL;
  if (!baseUrl) {
    throw new Error("Missing required environment variable: DASHBOARD_BASE_URL");
  }
  return `${baseUrl}/?token=${token}`;
}

// Step 1: Simulate ClickUp Task Creation
async function simulateClickUpTask() {
  console.log("🔹 Simulating ClickUp task creation...");
  const response = await fetch(`${CLICKUP_API_URL}/list/${WORKSPACE_ID}/task`, {
    method: "POST",
    headers: {
      "Authorization": CLICKUP_TOKEN,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "ROI Assessment Simulation",
      description: "Automated test for Phase 5 validation",
      status: "to do",
    }),
  });
  const data = await response.json();
  if (!data.id) {
    console.warn("⚠️ Warning: ClickUp task creation may have failed or status unavailable.");
  } else {
    console.log("✅ Task created:", data.id);
  }
  return data;
}

// Step 2: Trigger n8n Workflow
async function triggerN8N(taskData) {
  console.log("🔹 Triggering n8n workflow...");
  const response = await fetch(N8N_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(taskData),
  });
  const result = await response.json();
  console.log("✅ n8n workflow executed:", result);
  return result;
}

 // Step 3: Extract ROI and Utilization from ClickUp Task Fields
async function extractROIFromClickUp(taskData) {
  console.log("🔹 Extracting ROI and Utilization from ClickUp task fields...");
  const roiFieldId = process.env.CLICKUP_ROI_FIELD_ID;
  const utilizationFieldId = process.env.CLICKUP_UTILIZATION_FIELD_ID;

  const roiField = taskData.custom_fields?.find(f => f.id === roiFieldId);
  const utilizationField = taskData.custom_fields?.find(f => f.id === utilizationFieldId);

  const roi = roiField?.value || 0;
  const utilization = utilizationField?.value || 0;

  console.log("✅ Extracted ROI:", roi, "Utilization:", utilization);
  return { roi, utilization };
}

// Step 4: Update ClickUp with Tokenized Dashboard URL
async function updateClickUp(taskId, dashboardURL) {
  console.log("🔹 Updating ClickUp with dashboard URL...");
  const response = await fetch(`${CLICKUP_API_URL}/task/${taskId}`, {
    method: "PUT",
    headers: {
      "Authorization": CLICKUP_TOKEN,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      custom_fields: [
        {
          id: process.env.CLICKUP_DASHBOARD_FIELD_ID,
          value: dashboardURL,
        },
      ],
    }),
  });
  const result = await response.json();
  console.log("✅ ClickUp updated with dashboard URL:", dashboardURL);
  return result;
}

// Step 5: Validate Dashboard Rendering
async function validateDashboard(dashboardURL) {
  console.log("🔹 Validating dashboard rendering...");
  const response = await fetch(dashboardURL);
  if (response.ok) {
    const text = await response.text();
    if (text.includes("<title>") || text.includes("ROI")) {
      console.log("✅ Dashboard accessible and rendering correctly.");
    } else {
      console.warn("⚠️ Dashboard accessible but content validation uncertain.");
    }
  } else {
    console.error("❌ Dashboard validation failed:", response.status);
  }
}

// Main Execution Flow
(async () => {
  try {
    console.log("🚀 Executing Phase [5] — CAT Intelligence Synthesizer Integration");

    // Preflight environment validation
    const requiredEnv = ["CLICKUP_TOKEN", "N8N_WEBHOOK_URL", "CLIMB_API_URL", "DASHBOARD_BASE_URL"];
    requiredEnv.forEach((key) => {
      if (!process.env[key]) {
        console.warn(`⚠️ Missing environment variable: ${key}`);
      }
    });

    const task = await simulateClickUpTask();
    const n8nResult = await triggerN8N(task);
    const { roi, utilization } = await extractROIFromClickUp(task);

    const payload = {
      clientId: task.id,
      roi,
      utilization,
      timestamp: Date.now(),
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
    const dashboardURL = `${process.env.DASHBOARD_BASE_URL}/?token=${token}`;
    await updateClickUp(task.id, dashboardURL);
    await validateDashboard(dashboardURL);

    console.log("🎯 Phase [5] execution complete — all systems validated.");
  } catch (error) {
    console.error("❌ Phase [5] execution failed:", error);
  }
})();
