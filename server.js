const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/grok_dev');

const reviewsRouter = require(__dirname + '/routes/reviews_routes');

app.use(express.static(__dirname + '/build'));

app.use('/api', reviewsApi);

var PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server started on port: ' + PORT));
