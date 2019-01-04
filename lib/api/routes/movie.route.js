const express = require('express');
const expressJwt = require( 'express-jwt' );
const config = require( '../../utils/config' );
const movieCrtl = require('../controllers/movie.controller');

const router = express.Router();

router.route('/')
/** GET /api/movies - Get all movies */
  .get(movieCrtl.getAll)

/** POST /api/movies - Create new movie */
  .post(expressJwt({ secret: config.jwtSecret }), movieCrtl.create);

router.route('/:movieId')
/** GET /api/movies/:movieId - Get movie */
  .get(movieCrtl.get)

/** PUT /api/movies/:movieId - Update movie */
  .put(expressJwt({ secret: config.jwtSecret }), movieCrtl.update)

/** DELETE /api/movies/:movieId - Delete movie */
  .delete(expressJwt({ secret: config.jwtSecret }), movieCrtl.remove);

/** Load movie when API with movieId route parameter is hit */
router.param('movieId', movieCrtl.load);

module.exports = router;