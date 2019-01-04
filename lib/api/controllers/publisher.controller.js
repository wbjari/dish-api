'use strict';
const Publisher = require('../../models').Publisher;
const httpStatus = require( 'http-status' );

/**
 * Load publisher by id and append to req.
 */
function load(req, res, next, id) {
  Publisher.findById(id)
    .then((publisher) => {
      req.publisher = publisher;
      return next();
    })
    .catch(e => next(e));
}

/**
* Get publisher.
* @returns {Publisher}
*/
function get(req, res) {
  if ( req.publisher === null ) {
    return res.status( httpStatus.NOT_FOUND ).json();
  }
  else {
    return res.status( httpStatus.OK ).json( req.publisher );
  }
}

/**
 * Get all publishers
 * @returns {Publisher}
 */
function getAll(req, res) {
  Publisher.find({})
    .then( (results) => res.status( httpStatus.OK ).json( results ) )
    .catch( (error) => res.status( httpStatus.BAD_GATEWAY ).json( error ) );
}

/**
* Create new publisher.
* @property {string} req.body.name
* @returns {Publisher}
*/
function create(req, res, next) {
  const publisher = new Publisher({
    name: req.body.name,
    // movies: req.body.movies
  });

  publisher.save()
    .then(savedPublisher => res.json(savedPublisher))
    .catch(e => next(e));
}

/**
* Update existing publisher.
* @property {string} req.body.name
* @returns {Publisher}
*/
function update(req, res, next) {
  const publisher = req.publisher;

    publisher.name = req.body.name,
    // publisher.movies = req.body.movies,

  publisher.save()
    .then(savedPublisher => res.json(savedPublisher))
    .catch(e => next(e));
}
/**
 * Delete publisher.
 * @returns {Publisher}
 */
function remove(req, res, next) {
  const publisher = req.publisher;

  publisher.remove()
    .then(deletedPublisher => res.json(deletedPublisher))
    .catch(e => next(e));
}

module.exports = { load, get, getAll, create, update, remove };
