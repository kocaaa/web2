const mongoose = require('mongoose')

var MovieSchema = mongoose.Schema({
    title: { type: String },
    director: { type: String },
    genre: { type: String },
    description: { type: String },
    rating: { type: Number },
    owner: { type: String },
})

var MovieModel = mongoose.model('movie', MovieSchema)

MovieModel.saveMovie = async function (movie) {
    var newMovie = new MovieModel({
        title: movie.title,
        director: movie.director,
        genre: movie.genre,
        description: movie.description,
        rating: movie.rating,
        owner: movie._id,
    });

    return await newMovie.save();
}

MovieModel.deleteById = async function (id) {
    return await MovieModel.findByIdAndDelete(id)
}

MovieModel.updateMovie = async function (movie) {
    var edited_movie = await MovieModel.findById(movie._id)

    edited_movie.title = movie.title
    edited_movie.director = movie.director
    edited_movie.genre = movie.genre
    edited_movie.description = movie.description
    edited_movie.rating = movie.rating

    return await edited_movie.save(edited_movie)
}

module.exports = MovieModel