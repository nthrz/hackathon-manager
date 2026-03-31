const { getDb } = require('../db/database');

function getAll() {
  return getDb().prepare(`
    SELECT h.*, u.name AS owner_name
    FROM hackathons h
    JOIN users u ON h.owner_id = u.id
    ORDER BY h.created_at DESC
  `).all();
}

function getById(id) {
  return getDb().prepare(`
    SELECT h.*, u.name AS owner_name
    FROM hackathons h
    JOIN users u ON h.owner_id = u.id
    WHERE h.id = ?
  `).get(id);
}

function create(title, description, startDate, endDate, ownerId) {
  const result = getDb()
    .prepare('INSERT INTO hackathons (title, description, start_date, end_date, owner_id) VALUES (?, ?, ?, ?, ?)')
    .run(title, description, startDate, endDate, ownerId);
  return result.lastInsertRowid;
}

function isMember(hackathonId, userId) {
  const row = getDb()
    .prepare('SELECT 1 FROM hackathon_members WHERE hackathon_id = ? AND user_id = ?')
    .get(hackathonId, userId);
  return !!row;
}

function addMember(hackathonId, userId) {
  getDb()
    .prepare('INSERT OR IGNORE INTO hackathon_members (hackathon_id, user_id) VALUES (?, ?)')
    .run(hackathonId, userId);
}

function getMembers(hackathonId) {
  return getDb().prepare(`
    SELECT u.id, u.name, u.email, hm.joined_at
    FROM hackathon_members hm
    JOIN users u ON hm.user_id = u.id
    WHERE hm.hackathon_id = ?
  `).all(hackathonId);
}

module.exports = { getAll, getById, create, isMember, addMember, getMembers };
