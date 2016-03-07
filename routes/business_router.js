const express = require('express');
const jsonParser = require('body-parser').json();
const Business = require(__dirname + '/../models/business');
const handleDBError = require(__dirname + '/../lib/handleDBError');

const businessRouter = module.exports = exports = express.Router();

businessRouter.get('/businesses', (req, res) => {
  Business.find({}, (err, data)=> {
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

businessRouter.put('/businesses/:id', jsonParser, (req, res) => {
  const businessData = req.body;
  delete businessData._id;

  Business.update({_id: req.params.id}, businessData, (err, data) => {
    if (err) return handleDBError(err, res);
    res.status(200).json({msg: 'successfully updated business'});
  });
});

businessRouter.delete('/businesses/:id', (req, res) => {
  Business.remove({_id: req.params.id}, (err, data) => {
    if (err) return handleDBError(err, res);
    res.status(200).json({msg: 'successfully removed business from database'});
  });
});
