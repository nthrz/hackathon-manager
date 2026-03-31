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

  const form = document.getElementById('hackathon-form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    try {
      await apiFetch('POST', '/hackathons', {
        title:       document.getElementById('h-title').value.trim(),
        description: document.getElementById('h-desc').value.trim(),
        start_date:  document.getElementById('h-start').value,
        end_date:    document.getElementById('h-end').value
      });
      document.getElementById('create-form').classList.add('hidden');
      form.reset();
      await loadHackathons();
    } catch (err) {
      alert(err.message || 'Failed to create hackathon');
    } finally {
      btn.disabled = false;
    }
  });

  await loadHackathons();
}

async function loadHackathons() {
  try {
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
  } catch (err) {
    document.getElementById('hackathon-list').innerHTML =
      `<p class="error">Could not load hackathons: ${escape(err.message)}</p>`;
  }
}

init();
