const express = require('express');
const router = express.Router();
const hackathonController = require('../controllers/hackathonController');
const teamController = require('../controllers/teamController');
const { requireAuth } = require('../middlewares/auth');

router.get('/',              requireAuth, hackathonController.list);
router.post('/',             requireAuth, hackathonController.create);
router.post('/:id/join',     requireAuth, hackathonController.join);
router.get('/:id/members',   requireAuth, hackathonController.members);
router.get('/:id/teams',     requireAuth, teamController.list);
router.get('/:id',           requireAuth, hackathonController.get);

module.exports = router;
