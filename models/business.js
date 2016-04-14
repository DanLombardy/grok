'use strict';

const mongoose = require('mongoose');

// Review questions are explained in detail in "1 Page Design" in Grok files. 'Missing' stands for "What one thing are they missing?"

const reviewSchema = new mongoose.Schema({
  author: String,
  // reviewerid: Number,
  reviewDate: {type: Date, 'default': Date.now},
  people: String,
  time: String,
  quality: String,
  soul: String,
  missing: String
});

const businessSchema = new mongoose.Schema({
  name: {type: String, required: true},
  coords: {
    type: [Number],
    index: '2dsphere'
  },
  contactNumber: String,
	fullAddress: String,
  street: String,
  city: String,
  state: String,
  country: String,
  county: String,
  description: String,
  reviews:[reviewSchema]
});

module.exports = exports = mongoose.model('Business', businessSchema);
