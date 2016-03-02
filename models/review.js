const mongoose = require('mongoose');

// location schema? reviews would be subset
const reviewSchema = new mongoose.Schema({
  people: {type: String, required: true},
  time: String,
  quality: String,
  soul: String,
  missing: String
});

module.exports = exports = mongoose.model('Review', reviewSchema);
