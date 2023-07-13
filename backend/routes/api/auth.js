const router = require('express').Router();
const { check } = require('express-validator');
const validateToken = require('../../middleware/auth');
const { getCurrentUser } = require('../../controllers/auth');

router.get('/', validateToken, getCurrentUser);

module.exports = router;