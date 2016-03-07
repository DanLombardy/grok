const express = require('express');
const jsonParser = require('body-parser').json();
const Business = require(__dirname + '/../models/business');
const handleDBError = require(__dirname + '/../lib/handleDBError');

const reviewsRouter = module.exports = exports = express.Router();

// how to get all?
// reviewsRouter.get('/businesses/:id/reviews', (req, res) => {
//   Business.find({}, (err, data) => {
//     if (err) return handleDBError(err, res);
//     res.status(200).json(data)
//   });
// });

// reviewsRouter.get('/businesses/:id/reviews', (req, res) => {
//   Business.find(req.params.id)
