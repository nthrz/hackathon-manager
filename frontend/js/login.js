document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email    = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const btn      = e.target.querySelector('button[type="submit"]');
  const errEl    = document.getElementById('error-msg');

  btn.disabled = true;
  errEl.classList.add('hidden');

  try {
    await apiFetch('POST', '/auth/login', { email, password });
    window.location.href = 'hackathons.html';
  } catch (err) {
    errEl.textContent = err.message || 'Login failed';
    errEl.classList.remove('hidden');
    btn.disabled = false;
  }
});
