const Client = require('../models/client');
const Company = require('../models/company')

//add client
const create_client = (req, res) => {
    console.log(req.body)
    const client = new Client(req.body)
    client.save()
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            console.log(err);
        });
}

//show client
const show_client = (req, res) => {
    Client.find().sort({ createdAt: -1 })
        .then((result) => {
            res.send(result);
        })
        .catch(err => {
            console.log(err);
        });
}

//show clientby by id
const show_client_byid = (req, res) => {
    const id = req.params.id;
    Client.findById(id)
        .then((result) => {
            res.send(result);
        })
        .catch(err => {
            console.log(err);
        });
}

//update client
const update_client = (req, res) => {
    const id = req.params.id;
    Client.findByIdAndUpdate(id, {
        raison_sociale: req.body.raison_sociale,
        mf: req.body.mf,
        respensable: req.body.respensable,
        tle: req.body.tle,
        fax: req.body.fax,
        email: req.body.email,
        address: req.body.address,
        rib: req.body.rib
    })
        .then((result) => {
            res.status(200).send('client updated')
        })
        .catch(err => {
            consol.log(err);
        });
}

const UpdateEtatClient = (req, res) => {
    console.log('test', req.body)
    const id = req.params.id;
    /* const { etat } = req.body */
    Client.findByIdAndUpdate(id, {
        /* isdeleted: etat */
        etats: req.body.etats,
    })
        .then((result) => {
            res.status(200).send('client updated')
        })
        .catch(err => {
            consol.log(err);
        });
}



//delete client
const delete_client = (req, res) => {
    const id = req.params.id;
    Client.findByIdAndDelete(id)
        .then((result) => {
            res.status(200).send('client deleted')
        })
        .catch(err => {
            consol.log(err);
        });
}

//get client by company

const Get_client_bycompany = async (req, res) => {
    const id = req.params.id
    await Client.find({ companyId: id }).sort({ createdAt: -1 }).populate('companyId')
        .then((result) => {
            res.status(200).send(result)
        })
        .catch(err => {
            consol.log(err);
        })
}


module.exports = {
    create_client,
    show_client,
    update_client,
    show_client_byid,
    delete_client,
    Get_client_bycompany,
    UpdateEtatClient
};