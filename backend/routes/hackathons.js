const express = require('express');
const router = express.Router();
const hackathonController = require('../controllers/hackathonController');
const teamController = require('../controllers/teamController');
const { requireAuth } = require('../middlewares/auth');

router.get('/', requireAuth, hackathonController.list);
router.get('/:id', requireAuth, hackathonController.get);
router.post('/', requireAuth, hackathonController.create);
router.post('/:id/join', requireAuth, hackathonController.join);
router.get('/:id/members', requireAuth, hackathonController.members);
router.get('/:hackathonId/teams', requireAuth, teamController.list);

module.exports = router;
