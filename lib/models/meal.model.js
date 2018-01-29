const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GuestSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  guestAmount: {
    type: Number,
    required: true
  },
  isChef: {
    tpye: Boolean,
    required: true
  }
});

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

module.exports = {
  GuestSchema: mongoose.model('guestSchema', GuestSchema),
  Meal: mongoose.model('meal', MealSchema)
};