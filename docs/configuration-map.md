# 🧭 ProSynth ROI Framework — Configuration Map

---

## 🟩 Phase 1 — Environment Bootstrapping

**File:** `proSynth-roi-framework/.env`

| Variable | Description | Required | Used In |
|-----------|--------------|-----------|----------|
| `CLIMB_API_URL` | Base endpoint for CLIMB ROI computation API | ✅ | `workflows/roi_automation.json` → "Invoke CLIMB ROI API" node |
| `CLICKUP_API_URL` | Base endpoint for ClickUp API v2 | ✅ | `workflows/roi_automation.json` → "Update ClickUp Task" node |
| `N8N_WEBHOOK_URL` | Public webhook endpoint for n8n automation trigger | ✅ | `workflows/roi_automation.json` → "ClickUp Webhook Trigger" node |
| `JWT_SECRET` | Secret key for signing/verifying JWT tokens | ✅ | `server.js` (authentication middleware) |
| `CLICKUP_TOKEN` | Personal ClickUp API token for authenticated task updates | ✅ | `workflows/roi_automation.json` → "Update ClickUp Task" node |
| `DASHBOARD_BASE_URL` | Base URL for hosted ROI dashboard | ✅ | `scripts/phase3-engine.js`, `dashboard/js/main.js` |

---

## 🟩 Phase 2 — Workflow Integration (n8n)

**Automation Platform:** n8n  
**Workflow File:** `proSynth-roi-framework/workflows/roi_automation.json`  
**Workflow Name:** `ClickUp ROI Automation`

### Execution Order

1. **Trigger — ClickUp Webhook Trigger**
   - **Type:** `n8n-nodes-base.webhook`
   - **Method:** `POST`
   - **Path:** `/clickup-roi-trigger`
   - **Input:** JSON payload from ClickUp task event
   - **Output:** Raw ClickUp task data
   - **Purpose:** Initiates automation when a ClickUp task is updated or created

2. **Parser — Parse ClickUp Payload**
   - **Type:** `n8n-nodes-base.function`
   - **Input:** Raw ClickUp webhook body
   - **Output:** `{ taskId, roiParams }`
   - **Purpose:** Extracts task ID and ROI-related custom fields for computation

3. **External API — Invoke CLIMB ROI API**
   - **Type:** `n8n-nodes-base.httpRequest`
   - **URL:** `https://api.prosynth.ai/api/roi/compute`
   - **Method:** `POST`
   - **Headers:** `Content-Type: application/json`
   - **Body:** `{ "params": $json.roiParams }`
   - **Output:** ROI computation results including `dashboard_url`
   - **Purpose:** Sends parsed ROI parameters to CLIMB API for processing

4. **Update — Update ClickUp Task**
   - **Type:** `n8n-nodes-base.httpRequest`
   - **URL:** `https://api.clickup.com/api/v2/task/{{taskId}}`
   - **Method:** `PUT`
   - **Headers:**  
     - `Authorization: {{$env.CLICKUP_TOKEN}}`  
     - `Content-Type: application/json`
   - **Body:** `{ "custom_fields": [{ "id": "dashboard_url", "value": $json.data.dashboard_url }] }`
   - **Purpose:** Updates the ClickUp task with the generated dashboard link

---

## 🟩 Phase 3 — Output Layer (Dashboard)

**Output Type:** Web Dashboard  
**Location:** `proSynth-roi-framework/dashboard/`

- **Served From:** `https://prosynth-dashboard.netlify.app`
- **Access Method:** Direct link injected into ClickUp task custom field (`dashboard_url`)
- **Authentication:** JWT-based (signed using `JWT_SECRET`)
- **Example Token Payload:**
  ```json
  {
    "taskId": "abc123",
    "roiScore": 0.87,
    "exp": 1731340800
  }
  ```
- **Frontend Components:**
  - `dashboard/js/data-binding.js` — binds ROI data to UI
  - `dashboard/js/charts.js` — renders ROI visualizations
  - `dashboard/js/main.js` — handles token validation and data fetch

---

## 🟩 Phase 4 — Activation Checklist

| Input | Location | Purpose |
|--------|-----------|----------|
| `CLIMB_API_URL` | `.env` | Connects to ROI computation API |
| `CLICKUP_API_URL` | `.env` | Enables ClickUp task updates |
| `N8N_WEBHOOK_URL` | `.env` | Connects ClickUp to n8n automation |
| `JWT_SECRET` | `.env` | Secures dashboard access tokens |
| `CLICKUP_TOKEN` | `.env` | Authorizes ClickUp API updates |
| `DASHBOARD_BASE_URL` | `.env` | Defines dashboard output endpoint |
| `dashboard_url` field ID | `workflows/roi_automation.json` → Update ClickUp Task node | Maps computed dashboard link to ClickUp custom field |

---

## 🟩 Phase 5 — Activation Order

1. Insert all required environment variables into `.env`
2. Verify ClickUp custom field `dashboard_url` exists and matches workflow mapping
3. Deploy n8n workflow (`ClickUp ROI Automation`) and confirm webhook URL matches `.env`
4. Start backend service (`server.js`) to handle JWT and dashboard routing
5. Trigger a ClickUp task update to initiate full workflow
6. Confirm:
   - CLIMB API receives ROI parameters
   - ClickUp task updates with dashboard link
   - Dashboard renders ROI data correctly
7. Mark system as **LIVE**

---

✅ **File Saved:** `proSynth-roi-framework/docs/configuration-map.md`
