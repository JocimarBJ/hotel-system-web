const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/usersController');
const auth = require('../middleware/auth');

router.delete('/:id', auth, ctrl.remove);
router.get('/', auth, ctrl.list);
router.post('/', auth, ctrl.create);

module.exports = router;
