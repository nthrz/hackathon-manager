const bcrypt = require('bcryptjs');
const userModel = require('../models/userModel');

function register(req, res) {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const existing = userModel.findByEmail(email);
  if (existing) {
    return res.status(409).json({ error: 'Email already in use' });
  }

  const passwordHash = bcrypt.hashSync(password, 10);
  const id = userModel.create(name, email, passwordHash);
  req.session.userId = id;
  res.status(201).json({ id, name, email });
}

function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const user = userModel.findByEmail(email);
  if (!user || !bcrypt.compareSync(password, user.password_hash)) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  req.session.userId = user.id;
  res.json({ id: user.id, name: user.name, email: user.email });
}

function logout(req, res) {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ error: 'Logout failed' });
    res.json({ message: 'Logged out' });
  });
}

function me(req, res) {
  const user = userModel.findById(req.session.userId);
  res.json(user);
}

module.exports = { register, login, logout, me };
