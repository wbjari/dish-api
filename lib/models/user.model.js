const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const bcrypt = require( 'bcryptjs' );

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    inex: true 
  },
  password: {
    type: String,
    required: true
  }
});

const saltRounds = 10;

UserSchema.methods.setPassword = function(password) {
  this.password = bcrypt.hashSync(password, saltRounds);
};

UserSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);