const { getDb } = require('../db/database');

function getByHackathon(hackathonId) {
  return getDb().prepare(`
    SELECT t.*, u.name AS leader_name
    FROM teams t
    JOIN users u ON t.leader_id = u.id
    WHERE t.hackathon_id = ?
    ORDER BY t.created_at DESC
  `).all(hackathonId);
}

function getById(id) {
  return getDb().prepare(`
    SELECT t.*, u.name AS leader_name
    FROM teams t
    JOIN users u ON t.leader_id = u.id
    WHERE t.id = ?
  `).get(id);
}

function create(hackathonId, name, description, leaderId) {
  const result = getDb()
    .prepare('INSERT INTO teams (hackathon_id, name, description, leader_id) VALUES (?, ?, ?, ?)')
    .run(hackathonId, name, description, leaderId);
  return result.lastInsertRowid;
}

function isMember(teamId, userId) {
  const row = getDb()
    .prepare('SELECT 1 FROM team_members WHERE team_id = ? AND user_id = ?')
    .get(teamId, userId);
  return !!row;
}

function addMember(teamId, userId) {
  getDb()
    .prepare('INSERT OR IGNORE INTO team_members (team_id, user_id) VALUES (?, ?)')
    .run(teamId, userId);
}

function getMembers(teamId) {
  return getDb().prepare(`
    SELECT u.id, u.name, u.email, tm.joined_at
    FROM team_members tm
    JOIN users u ON tm.user_id = u.id
    WHERE tm.team_id = ?
  `).all(teamId);
}

module.exports = { getByHackathon, getById, create, isMember, addMember, getMembers };
