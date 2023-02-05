var MovieModel = require('../models/movie')

var find = async function () {
    return await MovieModel.find()
}

var findByOwnerId = async function (owner_id) {
    return await MovieModel.find({ owner: owner_id })
}

var findById = async function (id) {
    var movie = await MovieModel.findById(id)
    return movie
}

var save = async function (movie) {
    return await MovieModel.saveMovie(movie)
}

var update = async function (movie) {
    var movie = await MovieModel.updateMovie(movie)
    return movie
}

var deleteById = async function (id) {
    return MovieModel.deleteById(id)
}

module.exports = {
    find,
    findById,
    update,
    findByOwnerId,
    deleteById,
    save
}