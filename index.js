/**
 * Created by dheeraj on 5/2/15.
 * http://mongodb.github.io/node-mongodb-native/api-articles/nodekoarticle1.html
 */
var express = require('express');
var bodyParser = require('body-parser');
var config = require('./config');
var MongoClient = require('mongodb').MongoClient;
var Q = require('q');


var port = config.settings.port || 9000;
var router = express.Router();
var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
//set router for app
app.use('/api', router);
app.listen(port);

var db = null;
var testCollection = null;

// Connect to the db
MongoClient.connect("mongodb://localhost:27017/dheeraj", function (err, mongodb) {
    if (err) {
        console.error("---------------------------------------------------------");
        console.error("---------------- MONGO NOT FOUND, EXITING ---------------");
        console.error("---------------------------------------------------------");
        process.exit(1);
        return console.dir(err);
    } else {
        console.log("---------------------------------------------------------");
        console.log("---------------- MONGO FOUND ----------------------------");
        console.log("---------------------------------------------------------");
    }
    db = mongodb;
    testCollection = db.collection('test');
});


router.use(function (req, res, next) {
    // do logging
    console.log('got request ' + JSON.stringify(req.headers));
    // check authentication etc
    next(); // make sure we go to the next routes and don't stop here
});


/*//GET http://localhost:9000/api)
 router.get('/api', function(req, res) {
 res.json({ message: 'hooray! welcome to our api!' });
 });*/


router.route('/logs')
    // create a bear (accessed at POST http://localhost:9000/api/logs)
    .post(function (req, res) {
        console.log(req.body);
        testCollection.insert(req.body, {w: 1}, function (err, result) {
            if (err) {
                res.json({success: false, message: "new record not created", error: err});
            } else {
                res.json({success: true, message: "new record created", record: result});
            }
        });
    }).
    get(function (req, res) {
        testCollection.find().toArray(function (err, result) {
            if (err) {
                res.json({success: false, message: "records not found", error: err});
            } else {
                res.json({success: true, message: "records found", records: result});
            }
        });
    });

router.route('/logs/:log_id')

    .get(function (req, res) {
        res.json({message: "received GET id " + req.params.log_id});
    }).put(function (req, res) {
        res.json({message: "received PUT id " + req.params.log_id});
    }).delete(function (req, res) {
        res.json({message: "received DELETE id " + req.params.log_id});
    });


// all of our routes will be prefixed with /api

console.log('running server on port ' + port);