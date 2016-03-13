// REST API ROUTES FOR BUSINESSES
const express = require('express');
const jsonParser = require('body-parser').json();
const Business = require(__dirname + '/../models/business');
const handleDBError = require(__dirname + '/../lib/handle_db_error');

const businessRouter = module.exports = exports = express.Router();

businessRouter.get('/businesses', (req, res) => {
  Business.find({}, (err, data) => {
    if (err) return handleDBError(err, res);
    res.status(200).json(data);
  });
});

businessRouter.get('/businesses/:businessid', (req, res) => {
  Business.find({_id: req.params.businessid}, (err, data) => {
    if (err) return handleDBError(err, res);
    res.status(200).json(data);
  });
});

businessRouter.post('/businesses', jsonParser, (req, res) => {
  const newBusiness = new Business(req.body);
  newBusiness.save((err, data) => {
    if (err) return handleDBError(err, res);
    res.status(200).json(data);
  });
});

businessRouter.put('/businesses/:businessid', jsonParser, (req, res) => {
  const businessData = req.body;
  delete businessData._id;

  Business.update({_id: req.params.id}, businessData, (err, data) => {
    if (err) return handleDBError(err, res);
    res.status(200).json({msg: 'successfully updated business'});
  });
});

businessRouter.delete('/businesses/:businessid', (req, res) => {
  Business.remove({_id: req.params.id}, (err, data) => {
    if (err) return handleDBError(err, res);
    res.status(200).json({msg: 'successfully removed business'});
  });
});
