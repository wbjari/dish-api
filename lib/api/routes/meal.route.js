const express = require('express');
const expressJwt = require( 'express-jwt' );
const config = require( '../../utils/config' );
const mealCrtl = require('../controllers/meal.controller');

const router = express.Router();

router.route('/')
/** GET /api/meal - Get all meals */
  .get(mealCrtl.getAll)

/** POST /api/meal - Create new meal */
  .post(expressJwt({ secret: config.jwtSecret }), mealCrtl.create);

router.route('/:mealId')
/** GET /api/meal/:mealId - Get meal */
  .get(mealCrtl.get)

/** PUT /api/meal/:mealId - Update meal */
  .put(expressJwt({ secret: config.jwtSecret }), mealCrtl.update)

/** DELETE /api/meal/:mealId - Delete meal */
  .delete(expressJwt({ secret: config.jwtSecret }), mealCrtl.remove);

/** Load meal when API with mealId route parameter is hit */
router.param('mealId', mealCrtl.load);

module.exports = router;