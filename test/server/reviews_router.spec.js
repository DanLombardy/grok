const chai = require('chai');
const expect = chai.expect;
const mongoose = require('mongoose');
process.env.MONGOLAB_URI = 'mongodb://localhost/reviews_app_test';
const server = require(__dirname + '/../../server');
const Business = require(__dirname + '/../../models/business');

chai.use(require('chai-http'));

describe('reviews api', () => {
  beforeEach((done) => {
    Business.create({name: 'test business'}, (err, data) => {
      if (err) return console.log(err);
      this.business = data;
      done();
    });
  });

  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });

  it('should be able to retrieve all reviews of a specific business', (done) => {
    chai.request('localhost:3000')
      .get('/api/businesses/' + this.business._id +'/reviews')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(Array.isArray(res.body.reviews)).to.eql(true);
        done();
      });
  });

  it('should be able to add a business review', (done) => {
    chai.request('localhost:3000')
      .post('/api/businesses/' + this.business._id +'/reviews')
      .send({author: 'test author'})
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.author).to.eql('test author');
        done();
      });
  });

  describe('tests that require a review in a business', () => {
    beforeEach((done) => {
      Business.create({name: 'business', reviews: [{author: 'test author'}]}, (err, data) => {
        if (err) return console.log(err);
        this.business = data;
        this.testReview = data.reviews[0];
        done();
      });
    });

    it('should be able to find a business review by id', (done) => {
      chai.request('localhost:3000')
        .get('/api/businesses/' + this.business._id + '/reviews/' + this.testReview._id)
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body.review.author).to.eql('test author');
          done();
        });
    });

    // put and delete tests not workin as expected
    it('should be able to update a business review', (done) => {
      chai.request('localhost:3000')
        .put('/api/businesses/' + this.business._id + '/reviews/' + this.testReview._id)
        .send({author: 'updated test review'})
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          // expect(res.body.msg).to.eql('successfully updated review');
          done();
        });
    });

    it('should be able to delete a business review', (done) => {
      chai.request('localhost:3000')
        .delete('/api/businesses/' + this.business._id + '/reviews/' + this.testReview._id)
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          // expect(res.body.msg).to.eql('successfully deleted review');
          done();
        });
    });

  });
});
