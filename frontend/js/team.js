const params = new URLSearchParams(window.location.search);
const teamId = params.get('id');
let currentUser = null;
let currentTeam  = null;
let isMember     = false;

function badgeHtml(status) {
  const labels = {
    todo:        t('statusTodo'),
    in_progress: t('statusInProgress'),
    done:        t('statusDone')
  };
  return `<span class="badge badge-${status}">${labels[status] || status}</span>`;
}

async function init() {
  if (!teamId) { window.location.href = 'hackathons.html'; return; }

  try {
    currentUser = await apiFetch('GET', '/auth/me');
    if (!currentUser) return;
    document.getElementById('nav-user').textContent = currentUser.name;

    document.getElementById('btn-logout').addEventListener('click', async () => {
      await apiFetch('POST', '/auth/logout');
      window.location.href = 'login.html';
    });

    currentTeam = await apiFetch('GET', `/teams/${teamId}`);
    if (!currentTeam) return;

    document.getElementById('back-link').href = `hackathon.html?id=${currentTeam.hackathon_id}`;
    document.title = `${currentTeam.name} — HackManager`;
    document.getElementById('t-name').textContent   = currentTeam.name;
    document.getElementById('t-desc').textContent   = currentTeam.description || '';
    document.getElementById('t-leader').textContent = `${t('leader')} : ${currentTeam.leader_name}`;

    const members = await apiFetch('GET', `/teams/${teamId}/members`);
    if (!members) return;
    isMember = members.some(m => m.id === currentUser.id);

    renderMembers(members);

    if (!isMember) {
      const btn = document.getElementById('btn-join');
      btn.classList.remove('hidden');
      btn.addEventListener('click', async () => {
        btn.disabled = true;
        try {
          await apiFetch('POST', `/teams/${teamId}/join`);
          window.location.reload();
        } catch (err) {
          alert(err.message || t('failedJoinTeam'));
          btn.disabled = false;
        }
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

    const taskForm = document.getElementById('task-form');
    taskForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = taskForm.querySelector('button[type="submit"]');
      btn.disabled = true;
      try {
        await apiFetch('POST', '/tasks', {
          team_id:     parseInt(teamId),
          title:       document.getElementById('task-title').value.trim(),
          description: document.getElementById('task-desc').value.trim()
        });
        document.getElementById('create-task-form').classList.add('hidden');
        taskForm.reset();
        await loadTasks();
      } catch (err) {
        alert(err.message || t('failedCreateTask'));
      } finally {
        btn.disabled = false;
      }
    });

    await loadTasks();
  } catch (err) {
    console.error('Page error:', err);
  }
}

async function loadTasks() {
  try {
    const tasks = await apiFetch('GET', `/tasks/team/${teamId}`);
    if (!tasks) return;
    const list = document.getElementById('task-list');
    list.innerHTML = '';

    if (tasks.length === 0) {
      list.innerHTML = `<p class="muted">${t('noTasks')}</p>`;
      return;
    }

    const isLeader = currentTeam.leader_id === currentUser.id;

    tasks.forEach(task => {
      const item = document.createElement('div');
      item.className = 'task-item';

      const statusSelect = isMember
        ? `<select data-id="${task.id}" class="status-select">
            <option value="todo"        ${task.status === 'todo'        ? 'selected' : ''}>${t('statusTodo')}</option>
            <option value="in_progress" ${task.status === 'in_progress' ? 'selected' : ''}>${t('statusInProgress')}</option>
            <option value="done"        ${task.status === 'done'        ? 'selected' : ''}>${t('statusDone')}</option>
          </select>`
        : badgeHtml(task.status);

      const deleteBtn = isLeader
        ? `<button class="btn-delete" data-id="${task.id}">${t('delete')}</button>`
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
        try {
          await apiFetch('PATCH', `/tasks/${sel.dataset.id}/status`, { status: sel.value });
        } catch (err) {
          alert(err.message || t('failedUpdateStatus'));
          await loadTasks();
        }
      });
    });

    list.querySelectorAll('.btn-delete').forEach(btn => {
      btn.addEventListener('click', async () => {
        if (!confirm(t('deleteTask'))) return;
        try {
          await apiFetch('DELETE', `/tasks/${btn.dataset.id}`);
          await loadTasks();
        } catch (err) {
          alert(err.message || t('failedDeleteTask'));
        }
      });
    });
  } catch (err) {
    document.getElementById('task-list').innerHTML =
      `<p class="error">${t('failedLoadTasks')} : ${escape(err.message)}</p>`;
  }
}

function renderMembers(members) {
  const list = document.getElementById('member-list');
  list.innerHTML = '';
  members.forEach(m => {
    const item = document.createElement('div');
    item.className = 'member-item';
    const isLeader = m.id === currentTeam.leader_id;
    item.innerHTML = `${escape(m.name)}${isLeader ? ` <span class="muted">${t('leaderBadge')}</span>` : ''}`;
    list.appendChild(item);
  });
}

init();
