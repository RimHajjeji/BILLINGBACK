const Invoice = require('../models/invoice');
const Client = require('../models/client');
const { forEach, parseInt } = require('lodash');
/* const collect=require('') */
//add invoice
const create_invoice = (req, res) => {
    console.log(req.body)
    const invoice = new Invoice(req.body)
    invoice.save()
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            console.log(err);
        });
}

//show invoiceqsdsdsd 
const show_invoice = (req, res) => {
    Invoice.find().sort({ createdAt: -1 })
        .then((result) => {
            res.send(result);
        })
        .catch(err => {
            console.log(err);
        });
}

//show invoice by id
const show_invoice_byid = (req, res) => {
    const id = req.params.id;
    Invoice.findById(id)
        .then((result) => {
            res.send(result);
        })
        .catch(err => {
            console.log(err);
        });
}

//update invoice
const update_invoice = (req, res) => {
    console.log('test', req.body)
    const id = req.params.id;
    Invoice.findByIdAndUpdate(id, {
        companyId: req.body.companyId,
        clientId: req.body.clientId,
        produit: req.body.produit,
        details: req.body.details,
        num: req.body.num,
        tmf: req.body.tmf,
        prix: req.body.prix,
        etats: req.body.etats,
        nomrs: req.body.nomrs,

    })
        .then((result) => {
            res.status(200).send('invoice updated')
        })
        .catch(err => {
            consol.log(err);
        });
}

//update etat
const update_invoice_etat = (req, res) => {
    console.log('test', req.body)
    const id = req.params.id;
    Invoice.findByIdAndUpdate(id, {
        etats: req.body.etats,
    })
        .then((result) => {
            res.status(200).send('invoice updated etats')
        })
        .catch(err => {
            consol.log(err);
        });
}



//delete invoice
const delete_invoice = (req, res) => {
    const id = req.params.id;
    Invoice.findByIdAndDelete(id)
        .then((result) => {
            res.status(200).send('invoice deleted')
        })
        .catch(err => {
            consol.log(err);
        });
}


/* const Get_invoice_by_company_id = (req, res) => {
    const id = req.params.id
    Invoice.find({ companyId: id }).populate('clientId').populate('materialId').populate('serviceId')
         Invoice.findOne({ companyId: id }).populate('companyId')
        .then((result) => {

            res.status(200).send(result)
        })
        .catch(err => {
            console.log(err);
        });
} */

const Get_invoice_Prix_by_company_id = async (req, res) => {
    const id = req.params.id
    await Invoice.find({ companyId: id }).sort({ createdAt: -1 }).populate('clientId').populate('materialId').populate('serviceId')
        /*  Invoice.findOne({ companyId: id }).populate('companyId') */
        .then(async (result) => {
            let obj = result
            sum = {
                montantHT: 0,
                montantHTT: 0,
                montontHTP: 0,
                montontHTNP: 0,
                tTVA: 0,
                montantTTC: 0,
                netapayer: 0,
            }
            etat = {
                pay: 0,
                notpay: 0,
                total: 0,

            }

            /*      console.log('serng', obj) */

            obj.forEach(el => {
                if (el?.materialId?.length > 0) {
                    el.materialId.map((el2) => {
                        sum.montantHT = sum.montantHT + parseFloat(el2.prix)
                        sum.tTVA = Math.round((sum.tTVA + parseFloat(el2.tva)) * 100) / 100;
                        sum.montantTTC = Math.round((sum.montantTTC + parseFloat(el2.ttc)) * 100) / 100;
                        /*  if (el.etats === true) {
                             sum.montontHTP = sum.montontHTP + parseInt(el2.prix)
                         } else {
                             sum.montontHTNP = sum.montontHTNP + parseInt(el2.prix)
                         } */

                    })
                }
                if (el.serviceId?.length > 0) {
                    el.serviceId.map((el3) => {
                        sum.montantHT = sum.montantHT + parseFloat(el3.prix)
                        sum.tTVA = Math.round((sum.tTVA + parseFloat(el3.tva)) * 100) / 100;
                        sum.montantTTC = Math.round((sum.montantTTC + parseFloat(el3.ttc)) * 100) / 100;

                    })
                }
                if (el.etats) {
                    etat.pay += 1
                    /*  sum.montontHTP = sum.montontHTP + parseInt(el.prix) */

                } else {
                    etat.notpay += 1
                    /* sum.montontHTNP = sum.montontHTNP + parseInt(el2.prix) */
                }
                if (el.etats === true) {
                    sum.montontHTP = sum.montontHTP + parseFloat(el.emontantHT)
                } else {
                    sum.montontHTNP = sum.montontHTNP + parseFloat(el.emontantHT)
                }
                sum.montantHTT = sum.montantHTT + parseFloat(el.emontantHT)
            })
            sum.netapayer = Math.round((sum.montantTTC + 600) * 100) / 100;
            etat.total = parseInt((etat.pay) + (etat.notpay));

            console.log('number iss', sum)
            res.status(200).send({ result, sum, etat })

        })
        .catch(err => {
            console.log(err);
        });
}


const Get_invoice_byclient = async (req, res) => {
    const id = req.params.id
    await Invoice.find({ clientId: id }).sort({ createdAt: -1 }).populate('clientId').populate('materialId').populate('serviceId')
        .then(async (result) => {
            let obj = result
            sum = {
                montantHT: 0,
                montantHTT: 0,
                montontHTP: 0,
                montontHTNP: 0,
                tTVA: 0,
                montantTTC: 0,
                netapayer: 0,
            }
            etat = {
                pay: 0,
                notpay: 0,
                total: 0,

            }

            /*      console.log('serng', obj) */

            obj.forEach(el => {
                if (el?.materialId?.length > 0) {
                    el.materialId.map((el2) => {
                        sum.montantHT = sum.montantHT + parseFloat(el2.prix)
                        sum.tTVA = Math.round((sum.tTVA + parseFloat(el2.tva)) * 100) / 100;
                        sum.montantTTC = Math.round((sum.montantTTC + parseFloat(el2.ttc)) * 100) / 100;
                        /*  if (el.etats === true) {
                             sum.montontHTP = sum.montontHTP + parseInt(el2.prix)
                         } else {
                             sum.montontHTNP = sum.montontHTNP + parseInt(el2.prix)
                         } */

                    })
                }
                if (el.serviceId?.length > 0) {
                    el.serviceId.map((el3) => {
                        sum.montantHT = sum.montantHT + parseFloat(el3.prix)
                        sum.tTVA = Math.round((sum.tTVA + parseFloat(el3.tva)) * 100) / 100;
                        sum.montantTTC = Math.round((sum.montantTTC + parseFloat(el3.ttc)) * 100) / 100;

                    })
                }
                if (el.etats) {
                    etat.pay += 1
                    /*  sum.montontHTP = sum.montontHTP + parseInt(el.prix) */

                } else {
                    etat.notpay += 1
                    /* sum.montontHTNP = sum.montontHTNP + parseInt(el2.prix) */
                }
                if (el.etats === true) {
                    sum.montontHTP = sum.montontHTP + parseFloat(el.emontantHT)
                } else {
                    sum.montontHTNP = sum.montontHTNP + parseFloat(el.emontantHT)
                }
                sum.montantHTT = sum.montantHTT + parseFloat(el.emontantHT)
            })
            sum.netapayer = Math.round((sum.montantTTC + 600) * 100) / 100;
            etat.total = parseInt((etat.pay) + (etat.notpay));

            console.log('number iss', sum)
            res.status(200).send({ result, sum, etat })

        })
        .catch(err => {
            console.log(err);
        });
}


const Get_ons_invoice_byclient = async (req, res) => {
    const id = req.params.id
    await Invoice.findOne({ companyId: id }).sort({ createdAt: -1 }).populate('clientId').populate('materialId').populate('serviceId')

        .then(async (result) => {

            res.status(200).send({ result })

        })
        .catch(err => {
            console.log(err);
        });
}



module.exports = {
    create_invoice,
    show_invoice,
    show_invoice_byid,
    update_invoice,
    delete_invoice,
    /*    Get_invoice_by_company_id, */
    Get_ons_invoice_byclient,
    Get_invoice_Prix_by_company_id,
    Get_invoice_byclient,
    update_invoice_etat,
};