"use strict";

var mongoose = require('mongoose');

var reviewUserSchema = new mongoose.Schema({
  userName: String,
  userId: String,
  password: String,
  signUpDate: Date,
  city: String,
  state: String,
  zip: String,
  phoneNumber: Number,
  email: String,
  reviews:[{
    reviewID: String,
    reviewDate: Date,
    businessId: String,
    businessName: String
  }],
  comments: []
});

module.exports = mongoose.model('ReviewUser', reviewUserSchema);
