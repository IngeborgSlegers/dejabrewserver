const router = require('express').Router()
const sequelize = require('../db')
const User = sequelize.import('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const validateSession = require('../middleware/validate-session')


/***********************************
 **     CREATE -- USER SIGN UP     **
 ***********************************/
router.post('/signup', (req, res) => {
    User.create({
            firstName: req.body.user.firstName,
            lastName: req.body.user.lastName,
            email: req.body.user.email,
            password: bcrypt.hashSync(req.body.user.password, 10)
        })
        .then(
            createSuccess = (user) => {
                let token = jwt.sign({
                    id: user.id
                }, process.env.JWT_SECRET, {
                    expiresIn: 60 * 60 * 24
                })

                res.json({
                    user: user,
                    message: 'user created',
                    sessionToken: token
                })
            },
            createError = err => res.send(500, err.message)
        )
})

/***********************************
 **    (CREATE?) -- USER LOG IN    **
 ***********************************/
router.post('/login', (req, res) => {
    User.findOne({
            where: {
                email: req.body.user.email
            }
        })
        .then(
            user => {
                if (user) {
                    bcrypt.compare(req.body.user.password, user.password, (err, matches) => {
                        if (matches) {
                            let token = jwt.sign({
                                id: user.id
                            }, process.env.JWT_SECRET, {
                                expiresIn: 60 * 60 * 24
                            })

                            res.json({
                                user: user,
                                message: 'successfully authenticated',
                                sessionToken: token
                            })
                        } else {
                            res.status(502).send({
                                error: 'bad gatway/passwords didn\'t match'
                            })
                        }
                    })
                } else {
                    res.status(500).send({
                        error: 'failed to authenticate'
                    })
                }
            },
            err => res.status(501).send({
                error: 'failed to process'
            })
        )
})

/***********************************
 **       READ -- USER INFO        **
 ***********************************/
router.get('/', validateSession, (req, res) => {
    User.findOne({
            where: {
                id: req.user.id
            }
        })
        .then(user => res.status(200).json(user))
        .catch(err => res.status(500).json({
            error: err
        }))
})

/***********************************
 **       UPDATE -- USER INFO      **
 ***********************************/
router.put('/', validateSession, (req, res) => {
    if (!req.errors) {
        User.update(req.body.user, { where: { id: req.user.id }})
            .then(user => res.status(200).json(user))
            .catch(err => res.json(req.errors))
    } else {
        res.status(500).json(req.errors)
    }
})

/***********************************
 **   DELETE -- ACCOUNT CANCELED   **
 ***********************************/
router.delete('/', validateSession, (req, res) => {
    User.destroy({
            where: {
                id: req.user.id
            }
        })
        .then(user => res.status(200).json(user))
        .catch(err => res.status(500).json({
            error: err
        }))
})

module.exports = router;