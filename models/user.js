const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    nom: {
        type: String,
        required: true
    },
    prenom: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    tle: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        required: true,
        default: 1,
    },

    etats: {
        type: Boolean,
        required: true,
        default: true,
    },
    token: {
        type: String,
        require: true,
    },
    abon: {
        type: String,
        required: true,

    },
    fabon: {
        type: String,
        required: true,

    },
},
    {
        timestamps: true
    });
const User = mongoose.model('User', userSchema);
module.exports = User;
