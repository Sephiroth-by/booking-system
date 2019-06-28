require('dotenv').config();
const mongoose = require("mongoose");
const express = require('express');

const User = require('./models/User');

const app = express();

mongoose.connect("mongodb://localhost:27017/bookingdb", { useNewUrlParser: true });

// const user = new User({
//   firstName: 'Oleg',
//   lastName: 'Ilenkov'
// });
// user.setPassword('123456');
// user.save();

app.get('/', function(request, response){
    response.send('<h2>Hello</h2>');
});

app.listen(process.env.PORT || 3001, () => console.log('listening'));
