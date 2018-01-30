'use strict';
const Meal = require('../../models').Meal;
const httpStatus = require( 'http-status' );

/**
 * Load meal by id and append to req.
 */
function load(req, res, next, id) {
  Meal.findById(id)
    .then((meal) => {
      req.meal = meal;
      return next();
    })
    .catch(e => next(e));
}

/**
* Get meal.
* @returns {Meal}
*/
function get(req, res) {
  if ( req.meal === null ) {
    return res.status( httpStatus.NOT_FOUND ).json();
  }
  else {
    return res.status( httpStatus.OK ).json( req.meal );
  }
}

/**
 * Get all meals
 * @returns {Meal}
 */
function getAll(req, res) {
  Meal.find({})
    .then( (results) => res.status( httpStatus.OK ).json( results ) )
    .catch( (error) => res.status( httpStatus.BAD_GATEWAY ).json( error ) );
}

/**
* Create new meal.
* @property {string} req.body.name - The name of the meal.
* @property {[Guests]} req.body.guests - The guests joining the meal.
* @property {maxGuests} req.body.maxGuests - The maximum amount of guests able to join.
* @property {Date} req.body.startDate - Time for the meal to take place.
* @property {Number} req.body.price - The price of the meal.
* @property {String} req.body.imagePath - The imagePath of the meal.
* @property {String} req.body.description - The description of the meal (calories, etc.).
* @returns {Meal}
*/
function create(req, res, next) {
  const meal = new MealModel({
    name: req.body.name,
    guests: req.body.guests,
    maxGuests: req.body.maxGuests,
    startDate: req.body.startDate,
    price: req.body.price,
    imagePath: req.body.imagePath,
    description: req.body.description
  });

  meal.save()
    .then(savedMeal => res.json(savedMeal))
    .catch(e => next(e));
}

/**
* Update existing meal.
* @property {string} req.body.name - The name of the meal.
* @property {[Guestsguest]} req.body.guests - The guests joining the meal.
* @property {maxGuests} req.body.maxGuests - The maximum amount of guests able to join.
* @property {Date} req.body.startDate - Time for the meal to take place.
* @property {Number} req.body.price - The price of the meal.
* @property {String} req.body.imagePath - The imagePath of the meal.
* @property {String} req.body.description - The description of the meal (calories, etc.).
* @returns {Meal}
*/
function update(req, res, next) {
  const meal = req.meal;

  meal.name = req.body.name;
  meal.guests = req.body.guests;
  meal.maxGuests = req.body.maxGuests;
  meal.startDate = req.body.startDate;
  meal.price = req.body.price;
  meal.imagePath = req.body.imagePath;
  meal.description = req.body.description;

  meal.save()
    .then(savedMeal => res.json(savedMeal))
    .catch(e => next(e));
}
/**
 * Delete meal.
 * @returns {Meal}
 */
function remove(req, res, next) {
  const meal = req.meal;

  meal.remove()
    .then(deletedMeal => res.json(deletedMeal))
    .catch(e => next(e));
}

module.exports = { load, get, getAll, create, update, remove };