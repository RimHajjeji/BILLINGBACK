const Service = require('../models/service');


//add service
const create_service = async (req, res) => {
    const service = new Service({
        companyId: req.body.companyId,
        nom: req.body.nom,
        categorie: req.body.categorie,
        ref_intr: req.body.ref_intr,
        prix: req.body.prix,
        tva: req.body.tva,
        amount: req.body.amount,
        mt_tva: Math.round(((parseFloat(req.body.prix) * parseFloat(req.body.amount)) * parseFloat(req.body.tva)) * 100) / 100,
        ttc: Math.round((parseFloat(req.body.prix) * (parseFloat(req.body.tva) + 1)) * 100) / 100,

    });
    try {
        const savedService = await service.save();
        res.send({ service: service._id });
    } catch {
        res.status(404).send(err)
    }



    /*    console.log(req.body)
       const service = new Service(req.body)
       service.save()
           .then(result => {
               res.send(result);
           })
           .catch(err => {
               console.log(err);
           }); */
}

//show service
const show_service = (req, res) => {
    Service.find().sort({ createdAt: -1 })
        .then((result) => {
            res.send(result);
        })
        .catch(err => {
            console.log(err);
        });
}

//show service by id
const show_service_byid = (req, res) => {
    const id = req.params.id;
    Service.findById(id)
        .then((result) => {
            res.send(result);
        })
        .catch(err => {
            console.log(err);
        });
}

//update service
const update_service = async (req, res) => {
    const id = req.params.id;
    let tva = null
    let prix = null
    await Service.findById(id)
        .then((result) => {
            tva = result.tva;
            prix = result.prix
        })
        .catch(err => {
            console.log(err);
        });
    console.log('sqeztz', req.body.tva)
    Service.findByIdAndUpdate((id), {
        nom: req.body.nom,
        categorie: req.body.categorie,
        ref_intr: req.body.ref_intr,
        prix: req.body.prix,
        tva: req.body.tva,
        amount: req.body.amount,
        mt_tva: Math.round((parseFloat(req.body.prix) * parseFloat(req.body.tva)) * 100) / 100,
        ttc: Math.round((parseFloat(req.body.prix) * (parseFloat(req.body.tva) + 1)) * 100) / 100,

    } /* : parseInt(req.body.prix) > 0 ? {
        nom: req.body.nom,
        categorie: req.body.categorie,
        ref_intr: req.body.ref_intr,
        prix: req.body.prix,
        tva: req.body.tva,
        mt_tva: Math.round((parseFloat(req.body.prix) * parseFloat(tva)) * 100) / 100,
        ttc: Math.round((parseFloat(req.body.prix) * (parseFloat(tva) + 1)) * 100) / 100, */
    /* } : parseFloat(req.body.tva) > 0 */  /* ||parseFloat(req.body.tva) ===0 */ /* ? */ /* {
        nom: req.body.nom,
        categorie: req.body.categorie,
        ref_intr: req.body.ref_intr,
        prix: req.body.prix,
        tva: req.body.tva,
        mt_tva: Math.round((parseFloat(prix) * parseFloat(req.body.tva)) * 100) / 100,
        ttc: Math.round((parseFloat(prix) * (parseFloat(req.body.tva) + 1)) * 100) / 100,
    } */ /* : parseFloat (req.body.tva)===0 ?{
        
        nom: req.body.nom,
        categorie: req.body.categorie,
        ref_intr: req.body.ref_intr,
        prix: req.body.prix,
        tva: req.body.tva,
        mt_tva: Math.round((parseFloat(prix) * parseFloat(req.body.tva)) * 100) / 100,
        ttc: Math.round((parseFloat(prix) * (parseFloat(req.body.tva) + 1)) * 100) / 100, */

      /*   mt_tva: Math.round((parseFloat(req.body.prix) * parseFloat(req.body.tva)) * 100) / 100,
        ttc: Math.round((parseFloat(req.body.prix) * (parseFloat(req.body.tva) + 1)) * 100) / 100, */
    /* } *//* :{
      nom: req.body.nom,
        categorie: req.body.categorie,
        ref_intr: req.body.ref_intr,
        prix: req.body.prix,
        tva: req.body.tva,  
    } */)
        .then((result) => {
            res.status(200).send('Service updated')

        })
        .catch(err => {
            consol.log(err);
        });

}

//delete service
const delete_service = (req, res) => {
    const id = req.params.id;
    Service.findByIdAndDelete(id)
        .then((result) => {
            res.status(200).send('service deleted')
        })
        .catch(err => {
            consol.log(err);
        });


}

//update amount
const update_service_emount = (req, res) => {
    console.log('test', req.body)
    const id = req.params.id;
    Service.findByIdAndUpdate(id, {
        amount: req.body.amount,
    })
        .then((result) => {
            res.status(200).send('Service updated amount')
        })
        .catch(err => {
            consol.log(err);
        });
}

const GET_service_bycompani = async (req, res) => {
    const id = req.params.id;
    await Service.find({ companyId: id }).sort({ createdAt: -1 })
        .then((result) => {
            res.status(200).send(result)
        })
        .catch(err => {
            console.log(err);
        })

}


module.exports = {
    create_service,
    show_service,
    show_service_byid,
    update_service,
    delete_service,
    GET_service_bycompani,
    update_service_emount,
};