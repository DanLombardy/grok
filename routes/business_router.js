// REST API ROUTES FOR BUSINESSES
'use strict';

const express = require('express');
const jsonParser = require('body-parser').json();
const Business = require(__dirname + '/../models/business');
const handleError = require(__dirname + '/../lib/handle_error');
const cloudTokenizer = require(__dirname + '/../lib/cloud_tokenizer');


const businessRouter = module.exports = exports = express.Router();

businessRouter.get('/businesses', (req, res) => {
	Business.find({}, (err, data) => {
		if (err) return handleError(err, res);
		res.status(200).json(data);
	});
});

businessRouter.post('/businesses/address', jsonParser, (req, res) => {
	let address = req.body.address;
	let reviews;
	let tokenCloud;
	Business.find({fullAddress: address}, (err, data) => {
		if (err) return handleError(err, res);

		//need to add in if case for empty array (no finds)
		if(Array.isArray(data)){
			reviews = data[0].reviews;
			tokenCloud = cloudTokenizer(reviews);
		} else {
			//need to make another iff when adding if case
			//for now this is just for if we get a single object
			reviews = [];
			review[0] = data.reviews;

			tokenCloud = cloudTokenizer(reviews);
		}

		res.status(200).json(tokenCloud);
	});
});

businessRouter.get('/businesses/:businessid', (req, res) => {
	Business.find({_id: req.params.businessid}, (err, data) => {
		if (err) return handleError(err, res);
		res.status(200).json(data);
	});
});

businessRouter.post('/businesses', jsonParser, (req, res) => {
	const newBusiness = new Business(req.body);
	newBusiness.save((err, data) => {
		if (err) return handleError(err, res);
		res.status(200).json(data);
	});
});

businessRouter.put('/businesses/:businessid', jsonParser, (req, res) => {
	const businessData = req.body;
	delete businessData._id;

	Business.update({_id: req.params.id}, businessData, (err, data) => {
		if (err) return handleError(err, res);
		res.status(200).json({msg: 'successfully updated business'});
	});
});

businessRouter.delete('/businesses/:businessid', (req, res) => {
	Business.remove({_id: req.params.id}, (err, data) => {
		if (err) return handleError(err, res);
		res.status(200).json({msg: 'successfully removed business'});
	});
});
