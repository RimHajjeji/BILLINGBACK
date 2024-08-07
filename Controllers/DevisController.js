const Devis = require('../models/devis');
const Client = require('../models/client');
const { forEach, parseInt } = require('lodash');

// add devis
const create_devis = (req, res) => {
    console.log(req.body)
    const devis = new Devis(req.body)
    devis.save()
        .then(result => {
            res.status(201).send(result);
        })
        .catch(err => {
            console.log(err);
            res.status(400).send('Error creating devis');
        });
}

// show all devis
const show_devis = (req, res) => {
    Devis.find().sort({ createdAt: -1 })
        .then((result) => {
            res.status(200).send(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Error fetching devis');
        });
}

// show devis by id
const show_devis_byid = (req, res) => {
    const id = req.params.id;
    Devis.findById(id)
        .then((result) => {
            if (!result) {
                return res.status(404).send('Devis not found');
            }
            res.status(200).send(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Error fetching devis by id');
        });
}

// update devis
const update_devis = (req, res) => {
    const id = req.params.id;
    Devis.findByIdAndUpdate(id, req.body, { new: true })
        .then((result) => {
            if (!result) {
                return res.status(404).send('Devis not found');
            }
            res.status(200).send('Devis updated');
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Error updating devis');
        });
}

// update etat
const update_devis_etat = (req, res) => {
    const id = req.params.id;
    Devis.findByIdAndUpdate(id, { etats: req.body.etats }, { new: true })
        .then((result) => {
            if (!result) {
                return res.status(404).send('Devis not found');
            }
            res.status(200).send('Devis etats updated');
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Error updating devis etats');
        });
}

// delete devis
const delete_devis = (req, res) => {
    const id = req.params.id;
    Devis.findByIdAndDelete(id)
        .then((result) => {
            if (!result) {
                return res.status(404).send('Devis not found');
            }
            res.status(200).send('Devis deleted');
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Error deleting devis');
        });
}

// Get devis prices by company id
const Get_devis_Prix_by_company_id = async (req, res) => {
    const id = req.params.id
    try {
        const result = await Devis.find({ companyId: id }).sort({ createdAt: -1 }).populate('clientId').populate('materialId').populate('serviceId');
        let sum = {
            montantHT: 0,
            montantHTT: 0,
            montontHTP: 0,
            montontHTNP: 0,
            tTVA: 0,
            montantTTC: 0,
            netapayer: 0,
        };
        let etat = {
            pay: 0,
            notpay: 0,
            total: 0,
        };

        result.forEach(el => {
            if (el?.materialId?.length > 0) {
                el.materialId.forEach(el2 => {
                    sum.montantHT += parseFloat(el2.prix);
                    sum.tTVA = Math.round((sum.tTVA + parseFloat(el2.tva)) * 100) / 100;
                    sum.montantTTC = Math.round((sum.montantTTC + parseFloat(el2.ttc)) * 100) / 100;
                });
            }
            if (el.serviceId?.length > 0) {
                el.serviceId.forEach(el3 => {
                    sum.montantHT += parseFloat(el3.prix);
                    sum.tTVA = Math.round((sum.tTVA + parseFloat(el3.tva)) * 100) / 100;
                    sum.montantTTC = Math.round((sum.montantTTC + parseFloat(el3.ttc)) * 100) / 100;
                });
            }
            if (el.etats) {
                etat.pay += 1;
            } else {
                etat.notpay += 1;
            }
            if (el.etats === true) {
                sum.montontHTP += parseFloat(el.emontantHT);
            } else {
                sum.montontHTNP += parseFloat(el.emontantHT);
            }
            sum.montantHTT += parseFloat(el.emontantHT);
        });
        sum.netapayer = Math.round((sum.montantTTC + 600) * 100) / 100;
        etat.total = parseInt(etat.pay + etat.notpay);

        res.status(200).send({ result, sum, etat });
    } catch (err) {
        console.log(err);
        res.status(500).send('Error fetching devis prices by company id');
    }
};

// Get devis by client id
const Get_devis_byclient = async (req, res) => {
    const id = req.params.id
    try {
        const result = await Devis.find({ clientId: id }).sort({ createdAt: -1 }).populate('clientId').populate('materialId').populate('serviceId');
        let sum = {
            montantHT: 0,
            montantHTT: 0,
            montontHTP: 0,
            montontHTNP: 0,
            tTVA: 0,
            montantTTC: 0,
            netapayer: 0,
        };
        let etat = {
            pay: 0,
            notpay: 0,
            total: 0,
        };

        result.forEach(el => {
            if (el?.materialId?.length > 0) {
                el.materialId.forEach(el2 => {
                    sum.montantHT += parseFloat(el2.prix);
                    sum.tTVA = Math.round((sum.tTVA + parseFloat(el2.tva)) * 100) / 100;
                    sum.montantTTC = Math.round((sum.montantTTC + parseFloat(el2.ttc)) * 100) / 100;
                });
            }
            if (el.serviceId?.length > 0) {
                el.serviceId.forEach(el3 => {
                    sum.montantHT += parseFloat(el3.prix);
                    sum.tTVA = Math.round((sum.tTVA + parseFloat(el3.tva)) * 100) / 100;
                    sum.montantTTC = Math.round((sum.montantTTC + parseFloat(el3.ttc)) * 100) / 100;
                });
            }
            if (el.etats) {
                etat.pay += 1;
            } else {
                etat.notpay += 1;
            }
            if (el.etats === true) {
                sum.montontHTP += parseFloat(el.emontantHT);
            } else {
                sum.montontHTNP += parseFloat(el.emontantHT);
            }
            sum.montantHTT += parseFloat(el.emontantHT);
        });
        sum.netapayer = Math.round((sum.montantTTC + 600) * 100) / 100;
        etat.total = parseInt(etat.pay + etat.notpay);

        res.status(200).send({ result, sum, etat });
    } catch (err) {
        console.log(err);
        res.status(500).send('Error fetching devis by client id');
    }
};

// Get one devis by company id
const Get_ons_devis_byclient = async (req, res) => {
    const id = req.params.id
    try {
        const result = await Devis.findOne({ companyId: id }).sort({ createdAt: -1 }).populate('clientId').populate('materialId').populate('serviceId');
        res.status(200).send({ result });
    } catch (err) {
        console.log(err);
        res.status(500).send('Error fetching one devis by company id');
    }
};

module.exports = {
    create_devis,
    show_devis,
    show_devis_byid,
    update_devis,
    delete_devis,
    Get_ons_devis_byclient,
    Get_devis_Prix_by_company_id,
    Get_devis_byclient,
    update_devis_etat
};
