const API = 'http://localhost:3000/api';
const params = new URLSearchParams(window.location.search);
const hackathonId = params.get('id');
let currentUser = null;
let currentHackathon = null;

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

function escape(str) {
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

async function init() {
  if (!hackathonId) { window.location.href = 'hackathons.html'; return; }

  currentUser = await apiFetch('GET', '/auth/me');
  if (!currentUser) return;
  document.getElementById('nav-user').textContent = currentUser.name;

  document.getElementById('btn-logout').addEventListener('click', async () => {
    await apiFetch('POST', '/auth/logout');
    window.location.href = 'login.html';
  });

  currentHackathon = await apiFetch('GET', `/hackathons/${hackathonId}`);
  if (!currentHackathon) return;

  document.title = `${currentHackathon.title} — HackManager`;
  document.getElementById('h-title').textContent = currentHackathon.title;
  document.getElementById('h-desc').textContent  = currentHackathon.description || '';
  document.getElementById('h-owner').textContent = `Organizer: ${currentHackathon.owner_name}`;

  if (currentHackathon.start_date || currentHackathon.end_date) {
    document.getElementById('h-dates').textContent =
      `${currentHackathon.start_date || '?'} → ${currentHackathon.end_date || '?'}`;
  }

  const members = await apiFetch('GET', `/hackathons/${hackathonId}/members`);
  const isMember = members.some(m => m.id === currentUser.id);

  if (!isMember) {
    const btn = document.getElementById('btn-join');
    btn.classList.remove('hidden');
    btn.addEventListener('click', async () => {
      await apiFetch('POST', `/hackathons/${hackathonId}/join`);
      window.location.reload();
    });
  } else {
    document.getElementById('btn-create-team').classList.remove('hidden');
  }

  document.getElementById('btn-create-team').addEventListener('click', () => {
    document.getElementById('create-team-form').classList.toggle('hidden');
  });

  document.getElementById('btn-cancel-team').addEventListener('click', () => {
    document.getElementById('create-team-form').classList.add('hidden');
  });

  document.getElementById('team-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    await apiFetch('POST', '/teams', {
      hackathon_id: parseInt(hackathonId),
      name:         document.getElementById('t-name').value.trim(),
      description:  document.getElementById('t-desc').value.trim()
    });
    document.getElementById('create-team-form').classList.add('hidden');
    document.getElementById('team-form').reset();
    loadTeams();
  });

  loadTeams();
}

async function loadTeams() {
  const teams = await apiFetch('GET', `/hackathons/${hackathonId}/teams`);
  if (!teams) return;
  const list = document.getElementById('team-list');
  list.innerHTML = '';

  if (teams.length === 0) {
    list.innerHTML = '<p class="muted">No teams yet.</p>';
    return;
  }

  teams.forEach(t => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <h3>${escape(t.name)}</h3>
      <p>${escape(t.description || '')}</p>
      <p class="muted">Leader: ${escape(t.leader_name)}</p>
    `;
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => {
      window.location.href = `team.html?id=${t.id}`;
    });
    list.appendChild(card);
  });
}

init();
