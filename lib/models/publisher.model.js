const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PublisherSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  // movies: [String]
}, {
  timestamps: true
});

module.exports = mongoose.model('publisher', PublisherSchema);