/* phase1-initialization.js — Phase [1]: Core UI setup and navigation logic
   --------------------------------------- */

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId.length > 1 && document.querySelector(targetId)) {
      e.preventDefault();
      document.querySelector(targetId).scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.navbar ul');

if (menuToggle && navMenu) {
  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    menuToggle.classList.toggle('active');
  });
}

// Active link highlighting
const currentPage = window.location.pathname.split('/').pop();
document.querySelectorAll('.navbar a').forEach(link => {
  if (link.getAttribute('href') === currentPage) {
    link.classList.add('active');
  }
});

// Minimal DOM interactions for cards or sections
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.classList.add('hovered');
  });
  card.addEventListener('mouseleave', () => {
    card.classList.remove('hovered');
  });
});

// Phase 4B: UI Output Layer Finalization
window.addEventListener('DOMContentLoaded', () => {
  const roiEl = document.getElementById('kpi-roi');
  const utilEl = document.getElementById('kpi-utilization');
  const timeEl = document.getElementById('kpi-timestamp');

  if (roiEl && utilEl && timeEl) {
    const payload = window.runtimePayload || {
      roi: 12.5,
      utilization: 78.3,
      timestamp: new Date().toLocaleString()
    };

    roiEl.textContent = payload.roi.toFixed(2) + '%';
    utilEl.textContent = payload.utilization.toFixed(1) + '%';
    timeEl.textContent = payload.timestamp;
  }

  // Static utilization trend line (temporary)
  const canvas = document.getElementById('utilizationTrendChart');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    const data = [60, 65, 70, 75, 80, 78, 82];
    const step = canvas.width / (data.length - 1);

    ctx.strokeStyle = '#0077cc';
    ctx.lineWidth = 2;
    ctx.beginPath();
    data.forEach((val, i) => {
      const x = i * step;
      const y = canvas.height - (val / 100) * canvas.height;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // Draw baseline
    ctx.strokeStyle = '#cccccc';
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(0, canvas.height - 0.6 * canvas.height);
    ctx.lineTo(canvas.width, canvas.height - 0.6 * canvas.height);
    ctx.stroke();
  }
});
