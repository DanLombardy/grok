const express = require('express');
const app = express();
const mongoose = require('mongoose');
const businessRouter = require(__dirname + '/routes/business_router');
const reviewRouter = require(__dirname + '/routes/review_router');
const userRouter = require(__dirname + '/routes/user_router');

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/grok_dev');

process.env.APP_SECRET = process.env.APP_SECRET || 'UNSECURECHANGEMECHANGEME';

app.use(express.static(__dirname + '/build'));

app.use('/api', businessRouter);
app.use('/api', reviewRouter);
app.use('/api', userRouter);

var PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server started on port: ' + PORT));


