var MovieService = require('../services/movie')
var express = require('express')
var router = express.Router()
var passport = require('./config/config')

router.get('/:id',
    async (req, res) => {
        var movies = await MovieService.findByOwnerId(req.params.id);
        res.send(movies).status(200)
    })

router.post('/',
    async (req, res) => {
        await MovieService.save(req.body)
        res.send(true).status(200)
    })

router.delete('/:id',
    async (req, res) => {
        await MovieService.deleteById(req.params.id)
        res.send(true).status(200)
    })

router.get('/get-one/:id',
    async (req, res) => {
        var movie = await MovieService.findById(req.params.id)
        res.send(movie)
    })

router.put('/',
    async (req, res) => {
        var movie = await MovieService.update(req.body)
        res.send(movie)
    })

module.exports = router
