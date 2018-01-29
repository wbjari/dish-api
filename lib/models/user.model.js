const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const bcrypt = require( 'bcrypt' );

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    inex: true 
  },
  name: {
    type: String
  },
  password: {
    type: String,
    required: true
  }
});

const saltRounds = 10;

UserSchema.methods.setPassword = function(passwd) {
  this.password = bcrypt.hashSync(passwd, saltRounds);
};

UserSchema.methods.comparePassword = function(passwd) {
  return bcrypt.compareSync(passwd, this.password);
};

module.exports = mongoose.model('User', UserSchema);