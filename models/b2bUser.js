'use strict';

var mongoose = require('mongoose');

var b2bUserSchema = new mongoose.Schema({
  userName: String,
  userId: String,
  password: String,
  signUpDate: Date,
  email: String,
  city: String,
  state: String,
  phoneNumber: Number
});

module.exports = mongoose.model('B2bUser', b2bUserSchema);
