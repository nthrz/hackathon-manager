const hackathonModel = require('../models/hackathonModel');

function list(req, res) {
  const hackathons = hackathonModel.getAll();
  res.json(hackathons);
}

function get(req, res) {
  const hackathon = hackathonModel.getById(req.params.id);
  if (!hackathon) return res.status(404).json({ error: 'Not found' });
  res.json(hackathon);
}

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
function isValidDate(str) {
  if (!str) return true;
  return DATE_RE.test(str) && !isNaN(new Date(str).getTime());
}

function create(req, res) {
  const { title, description, start_date, end_date } = req.body;
  if (!title) return res.status(400).json({ error: 'Title is required' });
  if (!isValidDate(start_date) || !isValidDate(end_date)) {
    return res.status(400).json({ error: 'Dates must be in YYYY-MM-DD format' });
  }

  const id = hackathonModel.create(title, description, start_date, end_date, req.session.userId);
  hackathonModel.addMember(id, req.session.userId);
  res.status(201).json({ id });
}

function join(req, res) {
  const hackathon = hackathonModel.getById(req.params.id);
  if (!hackathon) return res.status(404).json({ error: 'Not found' });

  if (hackathonModel.isMember(hackathon.id, req.session.userId)) {
    return res.status(409).json({ error: 'Already a member' });
  }

  hackathonModel.addMember(hackathon.id, req.session.userId);
  res.json({ message: 'Joined hackathon' });
}

function members(req, res) {
  const hackathon = hackathonModel.getById(req.params.id);
  if (!hackathon) return res.status(404).json({ error: 'Not found' });
  res.json(hackathonModel.getMembers(req.params.id));
}

module.exports = { list, get, create, join, members };
