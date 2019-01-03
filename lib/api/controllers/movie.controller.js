'use strict';
const Movie = require('../../models').Movie;
const httpStatus = require( 'http-status' );

/**
 * Load movie by id and append to req.
 */
function load(req, res, next, id) {
  Movie.findById(id)
    .then((movie) => {
      req.movie = movie;
      return next();
    })
    .catch(e => next(e));
}

/**
* Get movie.
* @returns {Movie}
*/
function get(req, res) {
  if ( req.movie === null ) {
    return res.status( httpStatus.NOT_FOUND ).json();
  }
  else {
    return res.status( httpStatus.OK ).json( req.movie );
  }
}

/**
 * Get all movies
 * @returns {Movie}
 */
function getAll(req, res) {
  Movie.find({})
    .then( (results) => res.status( httpStatus.OK ).json( results ) )
    .catch( (error) => res.status( httpStatus.BAD_GATEWAY ).json( error ) );
}

/**
* Create new movie.
* @property {string} req.body.name
* @property {string} req.body.publisher
* @property {string} req.body.genre
* @property {String} req.body.description
* @property {String} req.body.imagePath
* @returns {Movie}
*/
function create(req, res, next) {
  const movie = new Movie({
    name: req.body.name,
    publisher: req.body.publisher,
    genre: req.body.genre,
    description: req.body.description,
    imagePath: req.body.imagePath
  });

  movie.save()
    .then(savedMovie => res.json(savedMovie))
    .catch(e => next(e));
}

/**
* Update existing movie.
* @property {string} req.body.name
* @property {string} req.body.publisher
* @property {string} req.body.genre
* @property {String} req.body.description
* @property {String} req.body.imagePath
* @returns {Movie}
*/
function update(req, res, next) {
  const movie = req.movie;

    movie.name = req.body.name,
    movie.publisher = req.body.publisher,
    movie.genre = req.body.genre,
    movie.description = req.body.description,
    movie.imagePath = req.body.imagePath

  movie.save()
    .then(savedMovie => res.json(savedMovie))
    .catch(e => next(e));
}
/**
 * Delete movie.
 * @returns {Movie}
 */
function remove(req, res, next) {
  const movie = req.movie;

  movie.remove()
    .then(deletedMovie => res.json(deletedMovie))
    .catch(e => next(e));
}

module.exports = { load, get, getAll, create, update, remove };
