const config = require('../lib/utils/config');

const jwt = require('jsonwebtoken');

function checkErr(err) {
  if (err !== null) {
    throw err;
  }
}

function getToken(userId) {
  return jwt.sign({
    userId: userId
  }, config.jwtSecret);
}

function setAuth(ctx, userId) {
  const token = getToken(userId);
  return ctx.set('Authorization', 'Bearer ' + token);
}

module.exports = {
  checkErr: checkErr,
  getToken: getToken,
  setAuth: setAuth,

  // Templates
  userTemplate: {
    email: "johndoe@hotmail.com",
    name: "John Doe",
    password: "welkom123"
  },
  mealTemplate: {
    name: "Pizza Salami",
    guests: [
        {
          name: "Koen de Bont",
          guestAmount: 3,
          isChef: true
        },
        {
          name: "Jari Verhaard",
          guestAmount: 2,
          isChef: false
        }
      ],
    maxGuests: 5,
    startDate: "2017-11-22 09:33:47.512Z",
    price: 22.95,
    imagepath: "http://via.placeholder.com/350x150",
    description: "Lorem ipsum"
  }
};