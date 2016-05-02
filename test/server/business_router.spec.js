const chai = require('chai');
const expect = chai.expect;
const mongoose = require('mongoose');
process.env.MONGOLAB_URI = 'mongodb://localhost/business_app_test';
const server = require(__dirname + '/../../server');
const Business = require(__dirname + '/../../models/business');

chai.use(require('chai-http'));

describe('business api', () => {
	after((done) => {
		mongoose.connection.db.dropDatabase(() => {
			done();
		});
	});

	it('should be able to retrieve all the businesses', (done) => {
		chai.request('localhost:3000')
			.get('/api/businesses')
			.end((err, res) => {
				expect(err).to.eql(null);
				expect(Array.isArray(res.body)).to.eql(true);
				done();
			});
	});

	it('should be able to add a business', (done) => {
		chai.request('localhost:3000')
			.post('/api/businesses')
			.send({name: 'test business'})
			.end((err, res) => {
				expect(err).to.eql(null);
				expect(res).to.have.status(200);
				expect(res.body.name).to.eql('test business');
				done();
			});
	});

	describe('tests that require a business in db', () => {
		beforeEach((done) => {
			Business.create({name: 'test business'}, (err, data) => {
				if (err) return console.log(err);
				this.testBusiness = data;
				done();
			});
		});

		it('should be able to find a business by id', (done) => {
			chai.request('localhost:3000')
				.get('/api/businesses/' + this.testBusiness._id)
				.end((err, res) => {
					expect(err).to.eql(null);
					expect(res).to.have.status(200);
					expect(res.body[0].name).to.eql('test business');
					done();
				});
		});

		it('should be able to update a business', (done) => {
			chai.request('localhost:3000')
				.put('/api/businesses/' + this.testBusiness._id)
				.send({name: 'updated test business'})
				.end((err, res) => {
					expect(err).to.eql(null);
					expect(res).to.have.status(200);
					expect(res.body.msg).to.eql('successfully updated business');
					done();
				});
		});

		it('should be able to delete a business', (done) => {
			chai.request('localhost:3000')
				.delete('/api/businesses/' + this.testBusiness._id)
				.end((err, res) => {
					expect(err).to.eql(null);
					expect(res).to.have.status(200);
					expect(res.body.msg).to.eql('successfully removed business');
					done();
				});
		});
	});
});
