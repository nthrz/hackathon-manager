const taskModel = require('../models/taskModel');
const teamModel = require('../models/teamModel');

const VALID_STATUSES = ['todo', 'in_progress', 'done'];

function list(req, res) {
  const tasks = taskModel.getByTeam(req.params.teamId);
  res.json(tasks);
}

function create(req, res) {
  const { team_id, title, description } = req.body;
  if (!team_id || !title) {
    return res.status(400).json({ error: 'team_id and title are required' });
  }

  if (!teamModel.isMember(team_id, req.session.userId)) {
    return res.status(403).json({ error: 'You must be a team member to create tasks' });
  }

  const id = taskModel.create(team_id, title, description);
  res.status(201).json({ id });
}

function updateStatus(req, res) {
  const { status } = req.body;
  if (!VALID_STATUSES.includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }

  const task = taskModel.getById(req.params.id);
  if (!task) return res.status(404).json({ error: 'Not found' });

  if (!teamModel.isMember(task.team_id, req.session.userId)) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  taskModel.updateStatus(task.id, status);
  res.json({ message: 'Status updated' });
}

function remove(req, res) {
  const task = taskModel.getById(req.params.id);
  if (!task) return res.status(404).json({ error: 'Not found' });

  const team = teamModel.getById(task.team_id);
  if (team.leader_id !== req.session.userId) {
    return res.status(403).json({ error: 'Only the team leader can delete tasks' });
  }

  taskModel.remove(task.id);
  res.json({ message: 'Task deleted' });
}

module.exports = { list, create, updateStatus, remove };
