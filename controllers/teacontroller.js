let router = require('express').Router();

const Tea = require('../db').import('../models/tea')

const validateSession = require('../middleware/validate-session')

router.get('/', (req, res) => {
    Tea.findAll()
        .then(tea => res.status(200).json(tea))
        .catch(err => res.status(500).json({ error: err }))
})

router.post('/', validateSession, (req, res) => {
    if(!req.errors) {
        const teaFromRequest = {
            teaName: req.body.teaName,
            teaType: req.body.teaType,
            teaDescription: req.body.teaDescription,
            temp: req.body.temp,
            steepTime: req.body.steepTime,
            teaPrice: req.body.teaPrice,
            image: req.body.image
        }
        Tea.create(teaFromRequest)
            .then(tea => res.status(200).json(tea))
            .catch(err => res.json(req.errors))
    } else {
        res.status(500).json(req.errors)
    }
})

router.get('/:id', validateSession, (req, res) => {
    Tea.findOne({ where: { id: req.params.id }})
      .then(tea => res.status(200).json(tea))
      .catch(err => res.status(500).json({error: err}))
})

module.exports = router;
