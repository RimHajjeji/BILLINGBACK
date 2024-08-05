const Material = require('../models/material');


//add material

const create_material = async (req, res) => {
    const material = new Material({
        companyId: req.body.companyId,
        nom: req.body.nom,
        categorie: req.body.categorie,
        ref_intr: req.body.ref_intr,
        marqe: req.body.marqe,
        ref_cons: req.body.ref_cons,
        prix: req.body.prix,
        tva: req.body.tva,
        amount: req.body.amount,
        mt_tva: Math.round(((parseFloat(req.body.prix) * parseFloat(req.body.amount)) * parseFloat(req.body.tva)) * 100) / 100,
        ttc: Math.round((parseFloat(req.body.prix) * (parseFloat(req.body.tva) + 1)) * 100) / 100,
    });
    try {
        const savedMaterial = await material.save();
        res.status(200).send({ material: material._id });
    } catch {
        res.status(404).send(err)
    }
}



/* const create_material = (req, res) => {
    console.log(req.body)
    const material = new Material(req.body)
    material.save()
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            console.log(err);
        });
} */

//show material
const show_material = (req, res) => {
    Material.find().sort({ createdAt: -1 })
        .then((result) => {
            res.send(result);
        })
        .catch(err => {
            console.log(err);
        });
}

//show material by id
const show_material_byid = (req, res) => {
    const id = req.params.id;
    Material.findById(id)
        .then((result) => {
            res.send(result);
        })
        .catch(err => {
            console.log(err);
        });
}

//update material
const update_material = async (req, res) => {
    const id = req.params.id;
    let tva = null
    let prix = null
    await Material.findById(id)
        .then((result) => {
            tva = result.tva;
            prix = result.prix
        })
        .catch(err => {
            consol.log(err);
        });
    console.log('sqeztz', prix, tva,)
    Material.findByIdAndUpdate(id,/*  parseInt(req.body.prix) > 0 && parseFloat(req.body.tva) > 0 ? */ {
        nom: req.body.nom,
        categorie: req.body.categorie,
        ref_intr: req.body.ref_intr,
        amount: req.body.amount,
        marqe: req.body.marqe,
        ref_cons: req.body.ref_cons,
        prix: req.body.prix,
        tva: req.body.tva,
        mt_tva: Math.round(((parseFloat(req.body.prix) * parseFloat(req.body.amount)) * parseFloat(req.body.tva)) * 100) / 100,
        ttc: Math.round((parseFloat(req.body.prix) * (parseFloat(req.body.tva) + 1)) * 100) / 100,
/* 
    } : parseInt(req.body.prix) > 0 ? {
        nom: req.body.nom,
        categorie: req.body.categorie,
        ref_intr: req.body.ref_intr,
        amount: req.body.amount,
        marqe: req.body.marqe,
        ref_cons: req.body.ref_cons,
        prix: req.body.prix,
        tva: req.body.tva,
        mt_tva: Math.round((parseFloat(req.body.prix) * parseFloat(tva)) * 100) / 100,
        ttc: Math.round((parseFloat(req.body.prix) * (parseFloat(tva) + 1)) * 100) / 100,
    } : parseFloat(req.body.tva) > 0 ? {
        nom: req.body.nom,
        categorie: req.body.categorie,
        ref_intr: req.body.ref_intr,
        amount: req.body.amount,
        marqe: req.body.marqe,
        ref_cons: req.body.ref_cons,
        prix: req.body.prix,
        tva: req.body.tva,
        mt_tva: Math.round((parseFloat(prix) * parseFloat(req.body.tva)) * 100) / 100,
        ttc: Math.round((parseFloat(prix) * (parseFloat(req.body.tva) + 1)) * 100) / 100,
    } : {
        nom: req.body.nom,
        categorie: req.body.categorie,
        ref_intr: req.body.ref_intr,
        amount: req.body.amount,
        marqe: req.body.marqe,
        ref_cons: req.body.ref_cons,
        prix: req.body.prix,
        tva: req.body.tva,
        //        ttc: Math.round((parseInt(prix) * parseFloat(req.body.tva)) * 100) / 100
}    */})
        .then((result) => {
            res.status(200).send('material updated')
        })
        .catch(err => {
            consol.log(err);
        });
}

//update amount 

const update_material_emount = (req, res) => {
    console.log('test', req.body)
    const id = req.params.id;
    Material.findByIdAndUpdate(id, {
        amount: req.body.amount,
    })
        .then((result) => {
            res.status(200).send('material updated amount')
        })
        .catch(err => {
            consol.log(err);
        });
}


//delete material
const delete_material = (req, res) => {
    const id = req.params.id;
    Material.findByIdAndDelete(id)
        .then((result) => {
            res.status(200).send('material deleted')
        })
        .catch(err => {
            consol.log(err);
        });
}

const GET_material_bycompani = async (req, res) => {
    const id = req.params.id;
    await Material.find({ companyId: id }).sort({ createdAt: -1 })
        .then((result) => {
            res.status(200).send(result)
        })
        .catch(err => {
            console.log(err);
        })

}


module.exports = {
    create_material,
    show_material,
    show_material_byid,
    update_material,
    delete_material,
    GET_material_bycompani,
    update_material_emount,

};