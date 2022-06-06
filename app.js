const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const logger = require('morgan');
const router = express.Router();

const dbConfig = require('./config/db.config');

const mongoose = require('mongoose');
mongoose.connect(dbConfig.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Successfully connected to the database");
}).catch(err => {
  console.log('Could not connect to the database. Exiting now...', err);
  process.exit();
});


// initialize our express app
const app = express();
app.use(cors());
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended: false, limit: '50mb'}));
app.use(logger('dev'));
app.use(session({
  key: 'user_sid',
  secret: 'somerandonstuffs',
  resave: true,
  saveUninitialized: true,
  cookie: {
    expires: 600000
  }
}));

app.use('/', router);

// Import Routers.
const rentalRoute = require('./routes/rental.router');

app.use('/rental', rentalRoute);
const server = require('http').createServer(app);
server.listen(process.env.PORT || 5000, () => {
    console.log('Server is up and running on port numner: ' + (process.env.PORT || 5000));
});