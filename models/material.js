const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const materialSchema = new Schema({
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
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
    marqe: {
        type: String,
        required: false
    },
    ref_cons: {
        type: String,
        required: false
    },
    prix: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    mt_tva: {
        type: String,
        required: false
    },
    tva: {
        type: String,
        required: true
    },
    ttc: {
        type: String,
        required: false,
    },

},
    {
        timestamps: true
    });
const Material = mongoose.model('Material', materialSchema);
module.exports = Material;