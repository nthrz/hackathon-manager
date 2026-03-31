const { getDb } = require('../db/database');

function findByEmail(email) {
  return getDb().prepare('SELECT * FROM users WHERE email = ?').get(email);
}

function findById(id) {
  return getDb().prepare('SELECT id, name, email, created_at FROM users WHERE id = ?').get(id);
}

function create(name, email, passwordHash) {
  const result = getDb()
    .prepare('INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)')
    .run(name, email, passwordHash);
  return result.lastInsertRowid;
}

module.exports = { findByEmail, findById, create };
