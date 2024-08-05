const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serviceSchema = new Schema({
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    nom: {
        type: String,
        required: true
    },
    categorie: {
        type: String,
        required: true
    },
    ref_intr: {
        type: String,
        required: false
    },
    prix: {
        type: String,
        required: true
    },
    tva: {
        type: Number,
        required: true,

    },
    amount: {
        type: Number,
        required: true
    },
    mt_tva: {
        type: String,
        required: false
    },
    ttc: {
        type: String,
        required: false
    },
},
    {
        timestamps: true
    });
const Service = mongoose.model('Service', serviceSchema);
module.exports = Service;