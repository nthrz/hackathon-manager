const { getDb } = require('../db/database');

function getByTeam(teamId) {
  return getDb()
    .prepare('SELECT * FROM tasks WHERE team_id = ? ORDER BY created_at DESC')
    .all(teamId);
}

function getById(id) {
  return getDb().prepare('SELECT * FROM tasks WHERE id = ?').get(id);
}

function create(teamId, title, description) {
  const result = getDb()
    .prepare('INSERT INTO tasks (team_id, title, description) VALUES (?, ?, ?)')
    .run(teamId, title, description);
  return result.lastInsertRowid;
}

function updateStatus(id, status) {
  getDb().prepare('UPDATE tasks SET status = ? WHERE id = ?').run(status, id);
}

function remove(id) {
  getDb().prepare('DELETE FROM tasks WHERE id = ?').run(id);
}

module.exports = { getByTeam, getById, create, updateStatus, remove };
