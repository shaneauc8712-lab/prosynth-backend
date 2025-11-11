# ProSynth ROI Framework — Step-by-Step Configuration Walkthrough

This walkthrough guides you through configuring the **ProSynth ROI Framework** system from **Source → Processing → Output**.  
Each step corresponds to a specific configuration area detected in the project.  
Follow the steps in order. Do **not** skip ahead.

---

## 1. Environment Configuration

### 1.1 Configure Environment Variables
- **What:** Define system-level environment variables for API keys, data sources, and output directories.
- **Where (UI Navigation Path):**  
  - Open Visual Studio Code → Explorer → `proSynth-roi-framework/.env`
- **Where to Enter:**  
  - File path: `proSynth-roi-framework/.env`
- **Action:**  
  - Add or update the following placeholders:
    ```
    DATA_SOURCE_URL=<ENTER_REAL_VALUE>
    PROCESSING_MODE=<ENTER_REAL_VALUE>
    OUTPUT_DIRECTORY=<ENTER_REAL_VALUE>
    API_KEY=<ENTER_REAL_VALUE>
    ```
- **STOP:** Awaiting your input for real values before proceeding.

---

## 2. Source Configuration

### 2.1 Define Input Data Source
- **What:** Configure the data ingestion endpoint or file path.
- **Where (UI Navigation Path):**  
  - Open `proSynth-roi-framework/workflows/roi_automation.json`
- **Where to Enter:**  
  - JSON key: `"source": "<ENTER_REAL_VALUE>"`
- **Action:**  
  - Replace the placeholder with the actual data source (e.g., API endpoint or local dataset path).

---

## 3. Processing Configuration

### 3.1 Set Processing Parameters
- **What:** Adjust the parameters controlling the ROI synthesis and intelligence phases.
- **Where (UI Navigation Path):**  
  - Open `proSynth-roi-framework/scripts/phase2-execution.js`
  - Open `proSynth-roi-framework/scripts/phase3-engine.js`
- **Where to Enter:**  
  - Inside configuration objects or constants at the top of each file.
- **Action:**  
  - Update placeholders such as:
    ```js
    const PROCESSING_THRESHOLD = <ENTER_REAL_VALUE>;
    const MODEL_VARIANT = "<ENTER_REAL_VALUE>";
    ```

### 3.2 Configure Execution Phases
- **What:** Ensure each phase script (phase4, phase5) references correct environment variables.
- **Where (UI Navigation Path):**  
  - Open `proSynth-roi-framework/scripts/phase4-execution.js`
  - Open `proSynth-roi-framework/scripts/phase5-execution.mjs`
- **Where to Enter:**  
  - Verify `process.env` references match `.env` variable names.

---

## 4. Output Configuration

### 4.1 Define Output Paths
- **What:** Set the output directory for synthesized ROI results.
- **Where (UI Navigation Path):**  
  - Open `proSynth-roi-framework/server.js`
- **Where to Enter:**  
  - Locate the section handling file writes or static serving.
- **Action:**  
  - Update:
    ```js
    const OUTPUT_PATH = process.env.OUTPUT_DIRECTORY || "<ENTER_REAL_VALUE>";
    ```

### 4.2 Verify Dashboard Integration
- **What:** Ensure the dashboard visualizations read from the correct output data.
- **Where (UI Navigation Path):**  
  - Open `proSynth-roi-framework/dashboard/js/data-binding.js`
- **Where to Enter:**  
  - Locate the data fetch or binding function.
- **Action:**  
  - Update the data source path to match the configured output directory.

---

## 5. System Validation

### 5.1 Confirm Configuration Consistency
- **What:** Validate that all environment variables and file paths align.
- **Where (UI Navigation Path):**  
  - Review `.env`, `server.js`, and all `phase*.js` scripts.
- **Action:**  
  - Ensure no undefined variables or mismatched names exist.

---

**End of Walkthrough**

Once all placeholders are filled with real values, proceed to system initialization.

---

**Awaiting your response for Sub-step 1.1**
