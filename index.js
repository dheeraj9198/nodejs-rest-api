/**
 * Created by dheeraj on 5/2/15.
 */
var express = require('express');
var bodyParser = require('body-parser');
var config = require('./config');

var port = config.settings.port || 9000;
var router = express.Router();
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//set router for app
app.use('/', router);
app.listen(port);

router.use(function(req, res, next) {
    // do logging
    console.log('got request '+JSON.stringify(req.headers));
    // check authentication etc
    next(); // make sure we go to the next routes and don't stop here
});


//GET http://localhost:9000/api)
router.get('/api', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

// all of our routes will be prefixed with /api

console.log('running server on port ' + port);