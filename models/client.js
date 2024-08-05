const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientSchema = new Schema({

    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true,
    },
    raison_sociale: {
        type: String,
        required: true
    },
    mf: {
        type: String,
        required: true
    },
    respensable: {
        type: String,
        required: true
    },
    tle: {
        type: String,
        required: true
    },
    fax: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: false
    },
    rib: {
        type: String,
        required: true
    },
    isdeleted: {
        type: Boolean,
    }

},
    { timestamps: true }
);



const Client = mongoose.model('Client', clientSchema);
module.exports = Client;
