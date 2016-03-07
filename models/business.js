'use strict';

const mongoose = require('mongoose');

var businessSchema = new mongoose.Schema({
  businessName: String,
  businessId: String,
  contactNumber: Number,
  street: String,
  city: String,
  state: String,
  country: String,
  county: String,
  description: String,
  reviews:[{
    reviewId: String,
    reviewerId: String,
    reviewDate: Date,
    metric1: String,
    metric2: String,
    metric3: String,
    metric4: String,
    metric5: String
  }]
});

module.exports = exports = mongoose.model('Business', businessSchema);
