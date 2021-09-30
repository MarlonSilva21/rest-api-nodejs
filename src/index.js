const express = require('express');
const bodyParser = require('body-parser');

const app = express();  //create application

app.use(bodyParser.json());  //application using body-parser so that api accepts requests with json
app.use(bodyParser.urlencoded({ extended: false }));  //understand parameters passed via URL

require('./app/controllers/index')(app);  //referencing controllers by passing the app to them

app.listen(3000);  //port that will run the application
