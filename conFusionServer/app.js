const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const dishRouter = require('./routes/dishRouter');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors({ origin: true, credentials: true }));

mongoose.set('strictQuery', false);

const connect = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/conFusion');
    console.log('MongoDB connect successful.');
  } catch (err) {
    console.log(err);
    console.log('MongoDB connect fail');
  }
};

app.use('/dishes', dishRouter);
// app.use('/leaders', leaderRouter);
// app.use('/promotions', promoRouter);


// Connect to the database when the app starts
connect();

// Export the app module
module.exports = app;

