const express = require('express');
const expressJwt = require( 'express-jwt' );
const config = require( '../../utils/config' );
const publisherCrtl = require('../controllers/publisher.controller');

const router = express.Router();

router.route('/')
/** GET /api/publishers - Get all publishers */
  .get(publisherCrtl.getAll)

/** POST /api/publishers - Create new publisher */
  .post(expressJwt({ secret: config.jwtSecret }), publisherCrtl.create);

router.route('/:publisherId')
/** GET /api/publishers/:publisherId - Get publisher */
  .get(publisherCrtl.get)

/** PUT /api/publishers/:publisherId - Update publisher */
  .put(expressJwt({ secret: config.jwtSecret }), publisherCrtl.update)

/** DELETE /api/publishers/:publisherId - Delete publisher */
  .delete(expressJwt({ secret: config.jwtSecret }), publisherCrtl.remove);

/** Load publisher when API with publisherId route parameter is hit */
router.param('publisherId', publisherCrtl.load);

module.exports = router;