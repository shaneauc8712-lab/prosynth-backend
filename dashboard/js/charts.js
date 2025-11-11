document.addEventListener("updateUtilization", (e) => {
  const canvas = document.getElementById("utilizationCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const value = e.detail || 0;
  const radius = 100;
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Background circle
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
  ctx.strokeStyle = "#e0e0e0";
  ctx.lineWidth = 20;
  ctx.stroke();

  // Utilization arc
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, -Math.PI / 2, (2 * Math.PI * value) / 100 - Math.PI / 2);
  ctx.strokeStyle = "#003366";
  ctx.lineWidth = 20;
  ctx.stroke();

  // Text
  ctx.font = "24px Inter";
  ctx.fillStyle = "#2B2B2B";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(value + "%", centerX, centerY);
});

document.addEventListener("updateRevenueChart", (e) => {
  const canvas = document.getElementById("revenueChart");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const data = e.detail || [];

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (data.length === 0) return;

  const maxVal = Math.max(...data.map(d => d.value));
  const stepX = canvas.width / (data.length - 1);
  const scaleY = (canvas.height - 40) / maxVal;

  ctx.beginPath();
  ctx.moveTo(0, canvas.height - data[0].value * scaleY);
  data.forEach((point, i) => {
    ctx.lineTo(i * stepX, canvas.height - point.value * scaleY);
  });
  ctx.strokeStyle = "#003366";
  ctx.lineWidth = 2;
  ctx.stroke();
});
