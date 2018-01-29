'use strict';
const express = require( 'express' );

const authRoutes = require( './auth.route' );
const userRoutes = require( './user.route' );
const mealRoutes = require( './meal.route' );

const router = express.Router();

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

router.use('/auth', authRoutes);

// mount user routes at /users
router.use('/user', userRoutes);

// mount meal routes at /meal
router.use('/meal', mealRoutes);

module.exports = router;