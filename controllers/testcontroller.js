const express = require('express');
const router = express.Router();
const sequelize = require('../db')
const TestModel = sequelize.import('../models/test');

/****************************************
 * Controller Method #1: Simple Response
****************************************/
router.post('/one', function(req, res){
    res.send("Test 1 went through!")
});

/****************************************
 * Controller Method #2: Persisting Data
****************************************/
router.post('/two', function (req, res) {
    let testData = "Test data for endpoint two"; //5

    TestModel //6
    .create({ //7
            //9
        testdata: testData //8
    }).then(datafromDatabase => {
        res.send("Test two went through!")
    })
});

/***************************************
 * Controller Method #3: req.body
***************************************/
router.post('/three', function (req, res) {
    let testData = req.body.testdata.item;

    TestModel.create({
        testdata: testData
    })
    res.send("Test three went through!")
    console.log("Test three went through!")
});

//STEP 4 - Use this with Postman
router.post('/four', function (req, res) {
    let testData = req.body.testdata.item;
    TestModel
    .create({
        testdata: testData
    })
    .then(
        function message() {
        res.send("Test 4 went through");
        }
    );
});

/************************************
 * Route 5: Return data in a Promise
************************************/
router.post('/five', function (req, res) {
    let testData = req.body.testdata.item;
    TestModel
    .create({
        testdata: testData
    })
    .then(
        function message(data) {
            res.send(data);
        }
    );
});

/************************************
 * Route 6: Return response as JSON
************************************/
router.post('/six', function (req, res) {
    let testData = req.body.testdata.item;
    TestModel
    .create({
        testdata: testData
    })
    .then(
        function message(testdata) {
            res.json({
                testdata: testdata
            });
        }
    );
});

/**************************
 * Route 7: Handle errors
**************************/
router.post('/seven', function (req, res) {
    let testData = req.body.testdata.item;

    TestModel
    .create({
        testdata: testData
    })
    .then(
        function createSuccess(testdata) {
            res.json({
                testdata: testdata
            });
        },
        function createError(err) {
            res.send(500, err.message);
        }
    );
});

module.exports = router;