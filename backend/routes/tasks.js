const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { requireAuth } = require('../middlewares/auth');

router.get('/team/:teamId', requireAuth, taskController.list);
router.post('/', requireAuth, taskController.create);
router.patch('/:id/status', requireAuth, taskController.updateStatus);
router.delete('/:id', requireAuth, taskController.remove);

module.exports = router;
