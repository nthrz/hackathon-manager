const teamModel = require('../models/teamModel');
const hackathonModel = require('../models/hackathonModel');

function list(req, res) {
  const teams = teamModel.getByHackathon(req.params.hackathonId);
  res.json(teams);
}

function get(req, res) {
  const team = teamModel.getById(req.params.id);
  if (!team) return res.status(404).json({ error: 'Not found' });
  res.json(team);
}

function create(req, res) {
  const { hackathon_id, name, description } = req.body;
  if (!hackathon_id || !name) {
    return res.status(400).json({ error: 'hackathon_id and name are required' });
  }

  if (!hackathonModel.isMember(hackathon_id, req.session.userId)) {
    return res.status(403).json({ error: 'You must be a hackathon member to create a team' });
  }

  const id = teamModel.create(hackathon_id, name, description, req.session.userId);
  teamModel.addMember(id, req.session.userId);
  res.status(201).json({ id });
}

function join(req, res) {
  const team = teamModel.getById(req.params.id);
  if (!team) return res.status(404).json({ error: 'Not found' });

  if (!hackathonModel.isMember(team.hackathon_id, req.session.userId)) {
    return res.status(403).json({ error: 'You must be a hackathon member first' });
  }

  if (teamModel.isMember(team.id, req.session.userId)) {
    return res.status(409).json({ error: 'Already a member' });
  }

  teamModel.addMember(team.id, req.session.userId);
  res.json({ message: 'Joined team' });
}

function members(req, res) {
  const team = teamModel.getById(req.params.id);
  if (!team) return res.status(404).json({ error: 'Not found' });
  res.json(teamModel.getMembers(req.params.id));
}

module.exports = { list, get, create, join, members };
