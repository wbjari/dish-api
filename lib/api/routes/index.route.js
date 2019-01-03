'use strict';
const express = require('express');

const authRoutes = require('./auth.route');
const userRoutes = require('./user.route');
const movieRoutes = require('./movie.route');
const publisherRoutes = require('./publisher.route');


const router = express.Router();

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

router.use('/auth', authRoutes);

// mount user routes at /users
router.use('/users', userRoutes);

// mount publisher routes at /publishers
router.use('/publishers', publisherRoutes);

// mount movie routes at /movies
router.use('/movies', movieRoutes);

module.exports = router;