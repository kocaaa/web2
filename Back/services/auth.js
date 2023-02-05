var UserModel = require("../models/user")

var register = function (email, name, password) {
    return UserModel.register(email, name, password);
}

var findByUsername = function (username) {
    return UserModel.findOne({ name: username })
}

var findByEmail = function (email) {
    return UserModel.findOne({ email: email })
}

module.exports = {
    register,
    findByEmail,
    findByUsername
}