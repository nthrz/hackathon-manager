document.getElementById('register-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const name      = document.getElementById('name').value.trim();
  const email     = document.getElementById('email').value.trim();
  const password  = document.getElementById('password').value;
  const password2 = document.getElementById('password2').value;
  const btn       = e.target.querySelector('button[type="submit"]');
  const errEl     = document.getElementById('error-msg');

  if (password !== password2) {
    errEl.textContent = t('passwordMismatch');
    errEl.classList.remove('hidden');
    return;
  }

  btn.disabled = true;
  errEl.classList.add('hidden');

  try {
    await apiFetch('POST', '/auth/register', { name, email, password });
    window.location.href = 'hackathons.html';
  } catch (err) {
    errEl.textContent = err.message || t('registerFailed');
    errEl.classList.remove('hidden');
    btn.disabled = false;
  }
});
