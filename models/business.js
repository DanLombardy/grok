'use strict';

const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  author: String,
  // reviewerid: Number,
  reviewDate: {type: Date, 'default': Date.now},
  metric1: String,
  metric2: String,
  metric3: String,
  metric4: String,
  metric5: String
});

const businessSchema = new mongoose.Schema({
  name: String,
  contactNumber: Number,
  street: String,
  city: String,
  state: String,
  country: String,
  county: String,
  description: String,
  reviews:[reviewSchema]
});

module.exports = exports = mongoose.model('Business', businessSchema);
