const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MealSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  guests: [GuestSchema],
  maxGuests: {
    type: Number,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  imagePath: {
    type: String
  },
  description: {
    type: String
  }
}, {
  timestamps: true
});

const GuestSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  guestAmount: {
    type: Number,
    required: true
  }
});

const Meal = mongoose.model('meal', MealSchema);

// Add a 'dummy' user (every time you require this file!)
// const user = new User({
//   name: 'Joe',
// }).save();

module.exports = Meal;
