const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const mongoose = require('mongoose');
process.env.MONGOLAB_URI = 'mongodb://localhost/grok_app_test';
const server = require(__dirname + '/../server');
const Review = require(__dirname + '/../models/business');

describe('the reviews api', () => {
  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });

  it('should be able to retrieve all our reviews', (done) => {
    chai.request('localhost:3000')
      .get('/api/reviews')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(Array.isArray(res.body)).to.eql(true);
        done();
      });
  });

  // it('should create a review with a POST', (done) => {
  //   chai.request('localhost:3000')
  //     .post('/api/reviews')
  //     .send({name: 'test review'})
  //     .end(function(err, res) {
  //       expect(err).to.eql(null);
  //       expect(res).to.have.status(200);
  //       expect(res.body.name).to.eql('test review');
  //       expect(res.body).to.have.property('_id');
  //       done();
  //     });
  // });

  // describe('rest requests that require a review alread in db', () => {
  //   beforeEach((done) => {
  //     Review.create({name: 'test review'}, (err, data) => {
  //       this.testReview = data;
  //       done();
  //     });
  //   });

  //   it('should be able to update a review', (done) => {
  //     chai.request('localhost:3000')
  //       .put('/api/reviews/' + this.testReview._id)
  //       .send({name: 'new review name'})
  //       .end((err, res) => {
  //         expect(err).to.eql(null);
  //         expect(res).to.have.status(200);
  //         expect(res.body.msg).to.eql('success');
  //         done();
  //       });
  //   });

  //   it('should be able to delete a review', (done) => {
  //     chai.request('localhost:3000')
  //       .delete('/api/reviews/' + this.testReview._id)
  //       .end((err, res) => {
  //         expect(err).to.eql(null);
  //         expect(res).to.have.status(200);
  //         expect(res.body.msg).to.eql('success');
  //         done();
  //       });
  //   });
  // });
});
