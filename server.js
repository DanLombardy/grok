const express = require('express');
const app = express();
const mongoose = require('mongoose');
const reviewsRouter = require(__dirname + '/routes/reviews_routes');

var PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/grok_dev');


app.use(express.static(__dirname + '/build'));

app.use('/api', reviewsApi);

app.listen(PORT, () => console.log('Server started on port: ' + PORT));
