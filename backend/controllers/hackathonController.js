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

function create(req, res) {
  const { title, description, start_date, end_date } = req.body;
  if (!title) return res.status(400).json({ error: 'Title is required' });

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
