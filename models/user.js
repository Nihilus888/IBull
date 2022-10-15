const mongoose = require('mongoose')

const userSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true
    },

    job: {
        type: String,
    },

    position: {
        type: String,
    },

    experience: {
        type: Number,
        required: true
    },

    skills: {
        type: [],
    },

    networth: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('User', userSchema)