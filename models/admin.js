const { min } = require('lodash');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    nom:{
        type: String,
        required: true,
        min:4,
        max:255
    },
    prenom:{
        type: String,
        required: true,
        min:4,
        max:255
    },
    email:{
        type: String,
        required: true,
        min:6,
        max:255
    },
    password:{
        type: String,
        required: true,
        min:6,
        max:255
    },
/*     tle:{
        type: String,
        required: true,
        min:8,
        max:255
    }, */
},
{
    timestamps: true
});
const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;