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
* @property {string} req.body.name - The name of product.
* @property {string} req.body.category - The category of product.
* @property {string} req.body.gender - The gender of product.
* @property {string} req.body.price - The price of product.
* @property {string} req.body.sizes - The size of a product.
* @property {string} req.body.colors - The color of a product.
* @property {string} req.body.imageUrl - The imageUrl's of a product.
* @returns {Meal}
*/

function create(req, res, next) {
  const product = new Product({
    name: req.body.name,
    category: req.body.category,
    gender: req.body.gender,
    price: req.body.price,
    sizes: req.body.sizes,
    colors: req.body.colors,
    imageUrl: req.body.imageUrl
  });

  product.save()
    .then(savedProduct => res.json(savedProduct))
    .catch(e => next(e));
}

/**
* Update existing product.
* @property {string} req.body.name - The name of product.
* @property {string} req.body.category - The category of product.
* @property {string} req.body.gender - The gender of product.
* @property {string} req.body.price - The price of product.
* @property {string} req.body.sizes - The size of a product.
* @property {string} req.body.colors - The color of a product.
* @property {string} req.body.imageUrl - The imageUrl's of a product.
* @returns {Product}
*/
function update(req, res, next) {
  // TODO: Check if product is found.
  const product = req.product;
  product.name = req.body.name;
  product.category = req.body.category;
  product.gender = req.body.gender;
  product.price = req.body.price;
  product.sizes = req.body.sizes;
  product.colors = req.body.colors;
  product.imageUrl = req.body.imageUrl;
  product.save()
    .then(savedProduct => res.json(savedProduct))
    .catch(e => next(e));
}
/**
 * Delete product.
 * @returns {Product}
 */
function remove(req, res, next) {
  // TODO: Check if product is found.
  const product = req.product;
  product.remove()
    .then(deletedProduct => res.json(deletedProduct))
    .catch(e => next(e));
}

/**
 * Calculate total price of an order.
 * @param {OrderEntry} orderEntries
 */
function calculateOrderPrice( orderEntries ) {
  var promises = [];
  orderEntries.forEach( entry => {
    promises.push( Product.findById( entry.product ) );
  });
  return Promise.all(promises)
    .then((products) => {
      var orderTotal = 0;
      for(var i = 0; i < products.length; i++){
        orderTotal += products[i].price * orderEntries[i].quantity;
      }
      return Math.round( orderTotal * 100 ) / 100;
    });
}

module.exports = { load, get, getAll, create, update, remove, calculateOrderPrice };
