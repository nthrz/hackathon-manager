const API = 'http://localhost:3000/api';

async function apiFetch(method, path, body) {
  const res = await fetch(`${API}${path}`, {
    method,
    credentials: 'include',
    headers: body ? { 'Content-Type': 'application/json' } : {},
    body: body ? JSON.stringify(body) : undefined
  });
  if (res.status === 401) { window.location.href = 'login.html'; return; }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Error');
  return data;
}

async function init() {
  const user = await apiFetch('GET', '/auth/me');
  if (!user) return;
  document.getElementById('nav-user').textContent = user.name;

  document.getElementById('btn-logout').addEventListener('click', async () => {
    await apiFetch('POST', '/auth/logout');
    window.location.href = 'login.html';
  });

  document.getElementById('btn-create').addEventListener('click', () => {
    document.getElementById('create-form').classList.toggle('hidden');
  });

  document.getElementById('btn-cancel').addEventListener('click', () => {
    document.getElementById('create-form').classList.add('hidden');
  });

  document.getElementById('hackathon-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    await apiFetch('POST', '/hackathons', {
      title:       document.getElementById('h-title').value.trim(),
      description: document.getElementById('h-desc').value.trim(),
      start_date:  document.getElementById('h-start').value,
      end_date:    document.getElementById('h-end').value
    });
    document.getElementById('create-form').classList.add('hidden');
    document.getElementById('hackathon-form').reset();
    loadHackathons();
  });

  loadHackathons();
}

async function loadHackathons() {
  const hackathons = await apiFetch('GET', '/hackathons');
  if (!hackathons) return;
  const list = document.getElementById('hackathon-list');
  list.innerHTML = '';

  if (hackathons.length === 0) {
    list.innerHTML = '<p class="muted">No hackathons yet. Create the first one!</p>';
    return;
  }

  hackathons.forEach(h => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <h3>${escape(h.title)}</h3>
      <p>${escape(h.description || '')}</p>
      <p class="muted">By ${escape(h.owner_name)}</p>
    `;
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => {
      window.location.href = `hackathon.html?id=${h.id}`;
    });
    list.appendChild(card);
  });
}

function escape(str) {
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

init();
