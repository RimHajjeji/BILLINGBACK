const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companySchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    raison_sociale: {
        type: String,
        required: true
    },
    /*   activite: {
          type: String,
          required: false
      },
      pays: {
          type: String,
          required: false
      }, */
    tle: {
        type: String,
        required: true
    },
    fax: {
        type: String,
        required: false
    },
    web: {
        type: String,
        required: false
    },
    mf: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    /*  c_tva: {
         type: String,
         required: false
     }, */
    rib: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    image: {
        type: Object,
        required: false,
    }

},
    {
        timestamps: true
    });
const Company = mongoose.model('Company', companySchema);
module.exports = Company;