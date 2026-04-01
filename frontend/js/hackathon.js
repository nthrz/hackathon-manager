const params = new URLSearchParams(window.location.search);
const hackathonId = params.get('id');
let currentUser = null;
let currentHackathon = null;

async function init() {
  if (!hackathonId) { window.location.href = 'hackathons.html'; return; }

  try {
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
    document.getElementById('h-owner').textContent = `${t('organizer')} : ${currentHackathon.owner_name}`;

    if (currentHackathon.start_date || currentHackathon.end_date) {
      document.getElementById('h-dates').textContent =
        `${currentHackathon.start_date || '?'} → ${currentHackathon.end_date || '?'}`;
    }

    const members = await apiFetch('GET', `/hackathons/${hackathonId}/members`);
    if (!members) return;
    const isMember = members.some(m => m.id === currentUser.id);

    if (!isMember) {
      const btn = document.getElementById('btn-join');
      btn.classList.remove('hidden');
      btn.addEventListener('click', async () => {
        btn.disabled = true;
        try {
          await apiFetch('POST', `/hackathons/${hackathonId}/join`);
          window.location.reload();
        } catch (err) {
          alert(err.message || t('failedJoinHackathon'));
          btn.disabled = false;
        }
      });
    } else {
      document.getElementById('member-badge').classList.remove('hidden');
      document.getElementById('btn-create-team').classList.remove('hidden');
    }

    document.getElementById('btn-create-team').addEventListener('click', () => {
      document.getElementById('create-team-form').classList.toggle('hidden');
    });

    document.getElementById('btn-cancel-team').addEventListener('click', () => {
      document.getElementById('create-team-form').classList.add('hidden');
    });

    const teamForm = document.getElementById('team-form');
    teamForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = teamForm.querySelector('button[type="submit"]');
      btn.disabled = true;
      try {
        await apiFetch('POST', '/teams', {
          hackathon_id: parseInt(hackathonId),
          name:         document.getElementById('t-name').value.trim(),
          description:  document.getElementById('t-desc').value.trim()
        });
        document.getElementById('create-team-form').classList.add('hidden');
        teamForm.reset();
        await loadTeams();
      } catch (err) {
        alert(err.message || t('failedCreateTeam'));
      } finally {
        btn.disabled = false;
      }
    });

    await loadTeams();
  } catch (err) {
    console.error('Page error:', err);
  }
}

async function loadTeams() {
  try {
    const teams = await apiFetch('GET', `/hackathons/${hackathonId}/teams`);
    if (!teams) return;
    const list = document.getElementById('team-list');
    list.innerHTML = '';

    if (teams.length === 0) {
      list.innerHTML = `<p class="muted">${t('noTeams')}</p>`;
      return;
    }

    teams.forEach(team => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <h3>${escape(team.name)}</h3>
        <p>${escape(team.description || '')}</p>
        <p class="muted">${t('leader')} : ${escape(team.leader_name)}</p>
      `;
      card.style.cursor = 'pointer';
      card.addEventListener('click', () => {
        window.location.href = `team.html?id=${team.id}`;
      });
      list.appendChild(card);
    });
  } catch (err) {
    document.getElementById('team-list').innerHTML =
      `<p class="error">${t('failedLoadTeams')} : ${escape(err.message)}</p>`;
  }
}

init();
