const express = require('express');
const router = express.Router();
const sequelize = require('../db');
const TeaBox = require('../db').import('../models/teabox')
const validateSession = require('../middleware/validate-session')

// router.get('/', function(req, res) {
//     res.send('Hey!! this is a test route!');
// })

// router.post('/one', function (req, res){
//     res.send("Got a post request.")
// })

router.post('/', validateSession, (req,res) => {
    // let user = req.user.id;

    TeaBox.create({
        teaId: req.body.teaId,
        userId: req.user.id
    }).then(tea => res.status(200).json(tea))
})

router.get('/:id', validateSession, (req, res) => {
    TeaBox.findAll({where: {userId: req.user.id}})
    .then(tea => res.status(200).json(tea))
    .catch(err => res.status(500).json({ error: err }))
})


module.exports = router;