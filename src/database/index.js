//yarn add mongoose for install package
const mongoose = require('mongoose');  //package that node uses to connect to mongoDB

mongoose.connect('mongodb://localhost/noderest' );  //connecting to database
mongoose.Promise  = global.Promise;  //setting Mongoose's promise to global

module.exports = mongoose;
