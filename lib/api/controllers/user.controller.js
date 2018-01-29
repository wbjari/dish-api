'use strict';
const User = require( '../../models' ).User;
const httpStatus = require( 'http-status' );
const APIError = require( '../../utils/helpers/APIError' );
const jwt = require( 'jsonwebtoken' );
const config = require( '../../utils/config' );

/**
 * Load user and append to req.
 */
function load(req) {
  var userId = jwt.decode( req.headers.authorization.split(' ')[1], config.jwtSecret).userId;
  return new Promise((resolve, reject) => {
    if ( userId ) {
      User.findById(userId)
        .then((user) => {
          if ( user !== null ) {
            req.userFound = user;
            resolve();
          }
          else {
            reject();
          }
        })
        .catch(e => reject(e));
    } else {
      return reject();
    }
  });
}

/**
 * Get user
 * @returns {User}
 */
function get(req, res, next) {
  load(req)
    .then((result) => {
      console.log(result)
      return res.json(req.userFound);
    })
    .catch(() => {
      const err = new APIError( 'Data error: User not found', httpStatus.UNAUTHORIZED, true );
      return next(err);
    });
}

/**
 * Create new user
 * @property {string} req.body.email - The email of user.
 * @property {string} req.body.name - The name of user.
 * @property {string} req.body.password - The password of user.
 * @returns {User}
 */
function create(req, res, next) {
  User.findOne( { email: req.body.email } )
    .then( ( usr ) => {
      if ( usr === null ) {
        const user = new User({
          email:      req.body.email,
          firstName:  req.body.name
        });

        user.setPassword( req.body.password );

        user.save()
          .then((savedUser) => {
            savedUser.password = undefined;
            res.status(httpStatus.CREATED).json( savedUser );
          })
          .catch(e => next(e));
      }
      else {
        const err = new APIError( 'Authentication error: User exists', httpStatus.UNAUTHORIZED, true );
        return next(err);
      }
    })
    .catch(e => next(e));
}

/**
 * Update existing user
 * @property {string} req.body.email - The email of user.
 * @property {string} req.body.name - The name of user.
 * @property {string} req.body.password - The password of user.
 * @returns {User}
 */
function update(req, res, next) {
  load(req, res, next)
    .then( () => {
      const user = req.userFound;
      
      user.email   = req.body.email;
      user.name     = req.body.name;

      user.save()
        .then((savedUser) => {
          savedUser.password = undefined;
          res.status(httpStatus.ACCEPTED).json(savedUser);
        })
        .catch(e => next(e));
    })
    .catch(() => {
      const err = new APIError( 'Data error: Update failed', httpStatus.BAD_REQUEST, true );
      return next(err);
    });
}

/**
 * Delete user.
 * @returns {User}
 */
function remove(req, res, next) {
  const user = req.user;
  
  user.remove()
    .then(deletedUser => res.status(httpStatus.ACCEPTED).json(deletedUser))
    .catch(e => next(e));
}

module.exports = { load, get, create, update, remove };