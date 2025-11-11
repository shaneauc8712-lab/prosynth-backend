document.addEventListener("DOMContentLoaded", () => {
  const dateStamp = document.getElementById("date-stamp");
  if (dateStamp) {
    const now = new Date();
    dateStamp.textContent = now.toLocaleDateString();
  }

  // Example initialization hook
  console.log("ProSynth ROI Dashboard initialized.");
});
