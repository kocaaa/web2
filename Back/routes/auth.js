var authService = require('../services/auth')
var router = require('express').Router()

var passport = require('./config/config')

router.post('/register', async (req, res) => {

    var emailTaken = false
    var usernameTaken = false

    try {
        if (await authService.findByEmail(req.body.email)) {
            emailTaken = true
        }

        if (await authService.findByUsername(req.body.name)) {
            usernameTaken = true
        }

        var response = await authService.register(req.body.email, req.body.name, req.body.password);
    }
    catch (err) {
        console.log(err)
    }

    var taken = null

    if (emailTaken) {
        taken = "Email"
    }

    if (usernameTaken) {
        taken = "Username"
    }

    res.send({
        response: response,
        taken: taken
    })
})

router.post('/login',
    passport.authenticate('local', { session: false }),
    (req, res) => {
        res.send({
            "token": req.user.generateJwt(),
            "username": req.user.name,
            "_id": req.user._id
        }
        )
    })

router.post('/validate',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        res.status(200).send(true)
    })

module.exports = router;