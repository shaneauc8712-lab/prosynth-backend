## 1) Source System (Where the data originates)

### Platform
**ClickUp**

### Trigger Mechanism
**n8n Webhook:** `clickup-roi-trigger`  
**Webhook URL:** `https://shane-catalist.app.n8n.cloud/webhook/clickup-roi-trigger`  
Used inside ClickUp's webhook automation.

### Fields Referenced
- **ClickUp Task ID:** `869b42mxn`
- **ROI Parameter Inputs:**
  - 💎 **Dashboards Link:** `0a4f6baa-09cd-4a32-a085-c2fb02262899`
  - 🌐 **Company Name:** `761b1bb9-ddb8-4c33-b62a-7373184fcc8c`
  - 🌐 **Primary Contact Name:** `920b808b-7930-4e19-8c4c-0ccb1f886457`
  - 🌐 **Primary Contact Email:** `c921ac4f-4677-4350-8647-284ce6e2941a`
  - 🌐 **Team Size (Billable Delivery Staff):** `589a29a6-6a25-43cd-a929-4b093f86228b`
  - 🌐 **Current Monthly Revenue:** `2d7c8806-960c-4b5f-ab9e-14f0b058bd18`
  - 🌐 **Current Billable Utilization (%):** `f91648dd-b517-4a6e-b603-2cf59a047b4c`
  - 🌐 **# of Active Clients:** `f2bd8af1-4a8a-49c5-a3e4-b83dd19ccf4c`
  - 🌐 **Target Billable Utilization (%):** `02e79509-46c0-482b-bdfe-ebf18b91b32e`
  - 💎 **Lookup Key:** `a697f73f-a6d5-4c06-a2dc-7be0f6ec7926`
  - 💎 **Monthly Revenue:** `ef7bba84-a28c-419b-ac74-89dc50d2ed4f`
  - 💎 **Utilization Gap % (Formula):** `b9b7e156-84dc-41c1-a317-3cf322598e30`
  - 💎 **Projected Revenue (Formula):** `1b37a651-1253-4b4c-9c6d-dfff52a262f8`
  - 💎 **Revenue Opportunity (Formula):** `4ce19e02-3a0d-48c0-82e0-5f8a15e778d4`
  - 💎 **ROI Percent (Formula):** `ddbc8ac1-ef01-45a2-be1c-7888a2475f89`
  - 🌐 **Current Billable Hours per Month:** `ef83c2ce-2c5f-46cb-9093-ace59732e003`

### Custom Field Updated
- 💎 **Dashboards Link:** `0a4f6baa-09cd-4a32-a085-c2fb02262899`

### Connection Details
- **API Base:** `https://api.clickup.com/api/v2`
- **Auth Header:** `Authorization: {{CLICKUP_API_KEY}}`
- **Token stored in `.env` as:** `CLICKUP_TOKEN`
