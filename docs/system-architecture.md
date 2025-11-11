# ProSynth ROI Framework — System Architecture & UI Wireframe

## 1. Data Flow Diagram

```mermaid
flowchart LR
    A[Client Assessment Form (Webflow/ClickUp)] -->|Task Created/Updated| B[ClickUp API]
    B -->|Webhook Trigger| C[n8n Automation]
    C -->|Parse + Calculate ROI| D[CLIMB/Cline Dashboard Engine]
    D -->|Generate Tokenized URL| E[ClickUp Custom Field Update]
    E -->|Dashboard Link| F[Internal Consultant / Client View]
```

### Description
- **ClickUp** acts as the data hub, receiving client assessment data.
- **n8n** automates the workflow, processing metrics and invoking CLIMB/Cline APIs.
- **CLIMB/Cline** renders the ROI dashboard and quote module.
- **ClickUp** stores the generated dashboard URL for internal and client access.

---

## 2. UI Wireframe Outline

### **Dashboard Layout Overview**

| Section | Purpose | Key Elements |
|----------|----------|---------------|
| **Header** | Brand identity and client context | ProSynth logo, client name, date, ROI summary headline |
| **ROI Summary** | High-level performance metrics | KPI cards (ROI %, Payback Period, Efficiency Gain) |
| **Efficiency Breakdown** | Visual data insights | Bar/line charts, segmented performance indicators |
| **Quote Generator** | Pricing and proposal logic | Dynamic quote table, “Generate PDF” button |
| **Footer** | Legal and contact info | Minimal text, ProSynth brand tone |

---

## 3. Visual & Interaction Notes

- **Color Palette:** White (#FFFFFF), Graphite (#2B2B2B), Deep Blue (#003366), Metallic Silver (#B0B0B0)
- **Typography:** Inter / IBM Plex Sans — 400, 600 weights
- **Motion:** Subtle fade-in and scroll-reveal animations
- **Layout Flow:** Linear — *Assessment → Insight → Quote*
- **Access Control:** Tokenized URLs for client view; OAuth for internal users

---

## 4. Next Implementation Steps

1. Build ClickUp → n8n → CLIMB integration logic.
2. Implement dashboard HTML/CSS/JS structure.
3. Configure tokenized access and ClickUp field updates.
4. Test full workflow with sample client data.
