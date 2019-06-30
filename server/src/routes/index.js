const express = require('express');
const router = express.Router();

const authRoutes = require('./auth');
const sessionRoutes = require('./session');
const movieRoutes = require('./movie');
const orderRoutes = require('./order');

router.use('/auth', authRoutes);
router.use('/session', sessionRoutes);
router.use('/movie', movieRoutes);
router.use('/order', orderRoutes);

module.exports = router;
