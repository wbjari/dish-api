const express = require( 'express' );
const expressJwt = require( 'express-jwt' );
const config = require( '../../utils/config' );
const userCtrl = require( '../controllers/user.controller' );

const router = express.Router();

router.route('/')
  /** GET /api/users/:userId - Get user */
  .get(expressJwt({ secret: config.jwtSecret }), userCtrl.get)

  /** PUT /api/users/:userId - Update user */
  .put(expressJwt({ secret: config.jwtSecret }), userCtrl.update)

  /** POST /api/users - Create new user */
  .post(userCtrl.create)

  /** DELETE /api/users/:userId - Delete user */
  .delete(expressJwt({ secret: config.jwtSecret }), userCtrl.remove);

module.exports = router;
