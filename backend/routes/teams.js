const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');
const { requireAuth } = require('../middlewares/auth');

router.get('/:id', requireAuth, teamController.get);
router.post('/', requireAuth, teamController.create);
router.post('/:id/join', requireAuth, teamController.join);
router.get('/:id/members', requireAuth, teamController.members);

module.exports = router;
