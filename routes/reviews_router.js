// REST API ROUTES FOR BUSINESS REVIEWS
const express = require('express');
const jsonParser = require('body-parser').json();
const Business = require(__dirname + '/../models/business');
const handleDBError = require(__dirname + '/../lib/handleDBError');

const reviewRouter = module.exports = exports = express.Router();

reviewRouter.get('/businesses/:businessid/reviews', (req, res) => {
  Business
    .findById(req.params.businessid)
    .select('name reviews')
    .exec((err, business) => {
      var reviews = business.reviews;
      var response = {
        business: {
          name: business.name,
          id: req.params.businessid
        },
        reviews: reviews
      };
      if (err) return handleDBError(err, res);
      res.status(200).json(business);
    });
});

reviewRouter.get('/businesses/:businessid/reviews/:reviewid', (req, res) => {
  Business
    .findById(req.params.businessid)
    .select('name reviews')
    .exec((err, business) => {
      var review = business.reviews.id(req.params.reviewid);
      var response = {
        business: {
          name: business.name,
          id: req.params.businessid
        },
        review: review
      };
      if (err) return handleDBError(err, res);
      res.status(200).json(response);
    });
});

reviewRouter.post('/businesses/:businessid/reviews', jsonParser, (req, res) => {
  Business
    .findById(req.params.businessid)
    .select('reviews')
    .exec((err, business) => {
      var review = {
        author: req.body.author,
        metric1: req.body.metric1,
        metric2: req.body.metric2,
        metric3: req.body.metric3,
        metric4: req.body.metric4,
        metric5: req.body.metric5,
      }
      business.reviews.push(review);
      business.save(function(err, business) {
        var thisReview = business.reviews[business.reviews.length - 1];
        if (err) return handleDBError(err, res);
        res.status(200).json(thisReview);
      })
    });
});

reviewRouter.put('/businesses/:businessid/reviews/:reviewid', jsonParser, (req, res) => {
  Business
    .findById(req.params.businessid)
    .select('reviews')
    .exec((err, business) => {
      var thisReview = business.reviews.id(req.params.reviewid);
      thisReview.author = req.body.author;
      thisReview.metric1 = req.body.metric1;
      thisReview.metric2 = req.body.metric2;
      thisReview.metric3 = req.body.metric3;
      thisReview.metric4 = req.body.metric4;
      thisReview.metric5 = req.body.metric5;

      business.save((err, business) => {
        if (err) return handleDBError(err, res);
        res.status(200).json(thisReview);
      })
    });
});

reviewRouter.delete('/businesses/:businessid/reviews/:reviewid', (req, res) => {
  Business
    .findById(req.params.businessid)
    .select('reviews')
    .exec((err, business) => {
      business.reviews.id(req.params.reviewid).remove();
      business.save(function(err) {
        if (err) return handleDBError(err, res);
        res.status(200).json('successfully deleted review');
      })
    })
});


