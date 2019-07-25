require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes');
const app = express();

// const dbPopulate = require('./helpers/dbPopulate');
// dbPopulate();

mongoose.connect('mongodb://localhost:27017/bookingdb', { useNewUrlParser: true });

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api', routes);

app.use((err, req, res, next) => {
  res.status(err.status).json({
    ...err,
    message: err.message,
  });
});

app.listen(process.env.PORT || 3001, () => console.log('listening'));
