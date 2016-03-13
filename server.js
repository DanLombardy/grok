const express = require('express');
const app = express();
const mongoose = require('mongoose');
const businessRouter = require(__dirname + '/routes/business_router');
const reviewRouter = require(__dirname + '/routes/reviews_router');
// const Authenticat = new Authenticat('authenticat');
// const authenticat = new Authenticat(connection);

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/grok_dev');

app.use(express.static(__dirname + '/build'));

// app.use('/api', authenticat.router);
app.use('/api', businessRouter);
app.use('/api', reviewRouter);

// app.get('/user', authenticat.tokenAuth, (req,res) => {
//   return res.json({username: req.user.username});
// });

var PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server started on port: ' + PORT));


