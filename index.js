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
app.use('/api', router);
app.listen(port);

router.use(function(req, res, next) {
    // do logging
    console.log('got request '+JSON.stringify(req.headers));
    // check authentication etc
    next(); // make sure we go to the next routes and don't stop here
});


/*//GET http://localhost:9000/api)
router.get('/api', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});*/


router.route('/logs')
    // create a bear (accessed at POST http://localhost:9000/api/logs)
    .post(function(req, res) {
        //console.error(req);
    //use mongo schema
    /*
        var bear = new Bear();      // create a new instance of the Bear model
        bear.name = req.body.name;  // set the bears name (comes from the request)
        // save the bear and check for errors
        bear.save(function(err) {
            if (err)
                res.send(err);
            res.json({ message: 'Bear created!' });
        });*/
        res.json({message : "post POST saved"});
    }).
    get(function(req, res) {
        /*Bear.find(function(err, bears) {
            if (err)
                res.send(err);

            res.json(bears);
        });*/
        res.json({message : "get GET received"});
    });

router.route('/logs/:log_id')

    // get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
    .get(function(req, res) {
      /*  Bear.findById(req.params.bear_id, function(err, bear) {
            if (err)
                res.send(err);
            res.json(bear);
        });*/
        res.json({message : "received GET id "+req.params.log_id});
    }).put(function(req, res) {
        // use our bear model to find the bear we want
       /* Bear.findById(req.params.log_id, function(err, bear) {

            if (err)
                res.send(err);

            bear.name = req.body.name;  // update the bears info

            // save the bear
            bear.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Bear updated!' });
            });

        });*/
        res.json({message : "received PUT id "+req.params.log_id});
    }).delete(function(req, res) {
      /*  Bear.remove({
            _id: req.params.bear_id
        }, function(err, bear) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });*/
        res.json({message : "received DELETE id "+req.params.log_id});
    });


// all of our routes will be prefixed with /api

console.log('running server on port ' + port);