const express = require('express');
const { signup, login } = require('../controllers/auth.controller');

const router = express.Router();

/**
 * Auth Routes
 * Base Path: /api/auth
 */

router.post('/signup', signup);
router.post('/login', login);

module.exports = router;
