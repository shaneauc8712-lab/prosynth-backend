function loadROIData(jsonPayload) {
  if (!jsonPayload) return;

  const data = JSON.parse(jsonPayload);

  document.getElementById("clientNamePlaceholder").textContent = data.clientName || null;
  document.getElementById("roiValue").textContent = data.roiPercent || null;
  document.getElementById("paybackPeriod").textContent = data.paybackPeriod || null;
  document.getElementById("efficiencyGain").textContent = data.efficiencyGain || null;

  if (data.utilization) {
    const event = new CustomEvent("updateUtilization", { detail: data.utilization });
    document.dispatchEvent(event);
  }

  if (data.revenueProjection) {
    const event = new CustomEvent("updateRevenueChart", { detail: data.revenueProjection });
    document.dispatchEvent(event);
  }

  if (data.efficiencyBreakdown) {
    const tableBody = document.querySelector("#efficiencyTable tbody");
    tableBody.innerHTML = "";
    data.efficiencyBreakdown.forEach(row => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${row.category || ""}</td>
        <td>${row.metric || ""}</td>
        <td>${row.value || ""}</td>
      `;
      tableBody.appendChild(tr);
    });
  }
}
