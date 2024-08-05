const Devis = require('../models/devis');
const Client = require('../models/client');
const { forEach, parseInt } = require('lodash');

// add devis
const create_devis = (req, res) => {
    console.log(req.body)
    const devis = new Devis(req.body)
    devis.save()
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            console.log(err);
        });
}

// show all devis
const show_devis = (req, res) => {
    Devis.find().sort({ createdAt: -1 })
        .then((result) => {
            res.send(result);
        })
        .catch(err => {
            console.log(err);
        });
}

// show devis by id
const show_devis_byid = (req, res) => {
    const id = req.params.id;
    Devis.findById(id)
        .then((result) => {
            res.send(result);
        })
        .catch(err => {
            console.log(err);
        });
}

// update devis
const update_devis = (req, res) => {
    console.log('test', req.body)
    const id = req.params.id;
    Devis.findByIdAndUpdate(id, {
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
            res.status(200).send('devis updated')
        })
        .catch(err => {
            console.log(err);
        });
}

// update etat
const update_devis_etat = (req, res) => {
    console.log('test', req.body)
    const id = req.params.id;
    Devis.findByIdAndUpdate(id, {
        etats: req.body.etats,
    })
        .then((result) => {
            res.status(200).send('devis updated etats')
        })
        .catch(err => {
            console.log(err);
        });
}

// delete devis
const delete_devis = (req, res) => {
    const id = req.params.id;
    Devis.findByIdAndDelete(id)
        .then((result) => {
            res.status(200).send('devis deleted')
        })
        .catch(err => {
            console.log(err);
        });
}

const Get_devis_Prix_by_company_id = async (req, res) => {
    const id = req.params.id
    await Devis.find({ companyId: id }).sort({ createdAt: -1 }).populate('clientId').populate('materialId').populate('serviceId')
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

            obj.forEach(el => {
                if (el?.materialId?.length > 0) {
                    el.materialId.map((el2) => {
                        sum.montantHT = sum.montantHT + parseFloat(el2.prix)
                        sum.tTVA = Math.round((sum.tTVA + parseFloat(el2.tva)) * 100) / 100;
                        sum.montantTTC = Math.round((sum.montantTTC + parseFloat(el2.ttc)) * 100) / 100;
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
                } else {
                    etat.notpay += 1
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

const Get_devis_byclient = async (req, res) => {
    const id = req.params.id
    await Devis.find({ clientId: id }).sort({ createdAt: -1 }).populate('clientId').populate('materialId').populate('serviceId')
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

            obj.forEach(el => {
                if (el?.materialId?.length > 0) {
                    el.materialId.map((el2) => {
                        sum.montantHT = sum.montantHT + parseFloat(el2.prix)
                        sum.tTVA = Math.round((sum.tTVA + parseFloat(el2.tva)) * 100) / 100;
                        sum.montantTTC = Math.round((sum.montantTTC + parseFloat(el2.ttc)) * 100) / 100;
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
                } else {
                    etat.notpay += 1
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

const Get_ons_devis_byclient = async (req, res) => {
    const id = req.params.id
    await Devis.findOne({ companyId: id }).sort({ createdAt: -1 }).populate('clientId').populate('materialId').populate('serviceId')
        .then(async (result) => {
            res.status(200).send({ result })
        })
        .catch(err => {
            console.log(err);
        });
}

module.exports = {
    create_devis,
    show_devis,
    show_devis_byid,
    update_devis,
    delete_devis,
    Get_ons_devis_byclient,
    Get_devis_Prix_by_company_id,
    Get_devis_byclient,
    update_devis_etat,
};
