const express = require('express');
const { askTutor } = require('../controllers/tutorController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/ask', protect, askTutor);

module.exports = router;
