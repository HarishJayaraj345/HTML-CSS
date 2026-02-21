// script.js - theme toggle + small helpers
(function () {
  const rootHtml = document.documentElement;
  const toggleBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const themeLabel = toggleBtn.querySelector('.theme-label');
  const YEAR = document.getElementById('year');

  // Initialize year
  YEAR.textContent = new Date().getFullYear();

  // Read saved theme from localStorage (values: 'day' or 'night')
  const saved = localStorage.getItem('site-theme');

  function applyTheme(theme) {
    if (theme === 'day') {
      rootHtml.setAttribute('data-theme', 'day');
      toggleBtn.setAttribute('aria-pressed', 'true');
      themeIcon.textContent = '☀️';
      themeLabel.textContent = 'Noon';
    } else {
      rootHtml.setAttribute('data-theme', ''); // remove day attribute -> night defaults
      toggleBtn.setAttribute('aria-pressed', 'false');
      themeIcon.textContent = '🌙';
      themeLabel.textContent = 'Moon';
    }
  }

  // default: night
  applyTheme(saved === 'day' ? 'day' : 'night');

  toggleBtn.addEventListener('click', function () {
    const isDay = rootHtml.getAttribute('data-theme') === 'day';
    const next = isDay ? 'night' : 'day';
    applyTheme(next);
    localStorage.setItem('site-theme', next);
  });

  // keyboard accessibility: Toggle with "T"
  window.addEventListener('keydown', function (e) {
    if (e.key.toLowerCase() === 't') {
      toggleBtn.click();
    }
  });

  // Basic contact handler (no backend) — shows a friendly feedback and resets
  window.handleContact = function (ev) {
    ev.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    if (!name || !email) {
      alert('Please enter your name and email.');
      return false;
    }
    // For a real site: send to a server or Formspree / Netlify Forms
    alert(`Thanks ${name}! Message received (demo). I'll email you at ${email}.`);
    ev.target.reset();
    return false;
  };
})();
