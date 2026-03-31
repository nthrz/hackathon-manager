const API = 'http://localhost:3000/api';
const params = new URLSearchParams(window.location.search);
const teamId = params.get('id');
let currentUser = null;
let currentTeam  = null;
let isMember     = false;

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

function badgeHtml(status) {
  return `<span class="badge badge-${status}">${status.replace('_', ' ')}</span>`;
}

async function init() {
  if (!teamId) { window.location.href = 'hackathons.html'; return; }

  currentUser = await apiFetch('GET', '/auth/me');
  if (!currentUser) return;
  document.getElementById('nav-user').textContent = currentUser.name;

  document.getElementById('btn-logout').addEventListener('click', async () => {
    await apiFetch('POST', '/auth/logout');
    window.location.href = 'login.html';
  });

  currentTeam = await apiFetch('GET', `/teams/${teamId}`);
  if (!currentTeam) return;

  document.title = `${currentTeam.name} — HackManager`;
  document.getElementById('t-name').textContent   = currentTeam.name;
  document.getElementById('t-desc').textContent   = currentTeam.description || '';
  document.getElementById('t-leader').textContent = `Leader: ${currentTeam.leader_name}`;

  const members = await apiFetch('GET', `/teams/${teamId}/members`);
  isMember = members.some(m => m.id === currentUser.id);

  renderMembers(members);

  if (!isMember) {
    const btn = document.getElementById('btn-join');
    btn.classList.remove('hidden');
    btn.addEventListener('click', async () => {
      await apiFetch('POST', `/teams/${teamId}/join`);
      window.location.reload();
    });
  } else {
    document.getElementById('btn-create-task').classList.remove('hidden');
  }

  document.getElementById('btn-create-task').addEventListener('click', () => {
    document.getElementById('create-task-form').classList.toggle('hidden');
  });

  document.getElementById('btn-cancel-task').addEventListener('click', () => {
    document.getElementById('create-task-form').classList.add('hidden');
  });

  document.getElementById('task-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    await apiFetch('POST', '/tasks', {
      team_id:     parseInt(teamId),
      title:       document.getElementById('task-title').value.trim(),
      description: document.getElementById('task-desc').value.trim()
    });
    document.getElementById('create-task-form').classList.add('hidden');
    document.getElementById('task-form').reset();
    loadTasks();
  });

  loadTasks();
}

async function loadTasks() {
  const tasks = await apiFetch('GET', `/tasks/team/${teamId}`);
  if (!tasks) return;
  const list = document.getElementById('task-list');
  list.innerHTML = '';

  if (tasks.length === 0) {
    list.innerHTML = '<p class="muted">No tasks yet.</p>';
    return;
  }

  const isLeader = currentTeam.leader_id === currentUser.id;

  tasks.forEach(task => {
    const item = document.createElement('div');
    item.className = 'task-item';

    const statusSelect = isMember
      ? `<select data-id="${task.id}" class="status-select">
          <option value="todo"        ${task.status === 'todo'        ? 'selected' : ''}>Todo</option>
          <option value="in_progress" ${task.status === 'in_progress' ? 'selected' : ''}>In Progress</option>
          <option value="done"        ${task.status === 'done'        ? 'selected' : ''}>Done</option>
        </select>`
      : badgeHtml(task.status);

    const deleteBtn = isLeader
      ? `<button class="btn-delete" data-id="${task.id}">Delete</button>`
      : '';

    item.innerHTML = `
      <div>
        <div class="task-title">${escape(task.title)}</div>
        <div class="task-desc">${escape(task.description || '')}</div>
      </div>
      <div class="task-controls">
        ${statusSelect}
        ${deleteBtn}
      </div>
    `;
    list.appendChild(item);
  });

  list.querySelectorAll('.status-select').forEach(sel => {
    sel.addEventListener('change', async () => {
      await apiFetch('PATCH', `/tasks/${sel.dataset.id}/status`, { status: sel.value });
    });
  });

  list.querySelectorAll('.btn-delete').forEach(btn => {
    btn.addEventListener('click', async () => {
      await apiFetch('DELETE', `/tasks/${btn.dataset.id}`);
      loadTasks();
    });
  });
}

function renderMembers(members) {
  const list = document.getElementById('member-list');
  list.innerHTML = '';
  members.forEach(m => {
    const item = document.createElement('div');
    item.className = 'member-item';
    const isLeader = m.id === currentTeam.leader_id;
    item.innerHTML = `${escape(m.name)}${isLeader ? ' <span class="muted">(leader)</span>' : ''}`;
    list.appendChild(item);
  });
}

init();
