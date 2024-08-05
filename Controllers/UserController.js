const User = require('../models/user');
const moment = require('moment')


//update user
const update_user = (req, res) => {
    const id = req.params.id
    User.findByIdAndUpdate(id, {
        nom: req.body.nom,
        prenom: req.body.prenom,
        email: req.body.email,
        password: req.body.password,
        tle: req.body.tle,
    })
        .then((result) => {
            res.status(200).send('utilisatuer updated')
        })
        .catch(err => {
            consol.log(err);
        })
}

//update abon user
const update_abon_user = (req, res) => {
    const id = req.params.id
    const date = moment(req.body.abon)
    const fabon = moment(req.body.fabon)
    let now = moment()
    let etat = null
    if (now >= date && now <= fabon) {
        // date is future
        etat = true
    } else {
        // date is past
        etat = false
    }
    User.findByIdAndUpdate(id, {
        abon: req.body.abon,
        fabon: req.body.fabon,
        etats: etat
    })
        .then((result) => {
            res.status(200).send('utilisatuer etats updated')
        })
        .catch(err => {
            consol.log(err);
        })
}

const UpdateEtatUser = (req, res) => {
    console.log('test', req.body)
    const id = req.params.id;
    /* const { etat } = req.body */
    User.findByIdAndUpdate(id, {
        /* isdeleted: etat */
        etats: req.body.etats,
    })
        .then((result) => {
            res.status(200).send('User etats updated')
        })
        .catch(err => {
            consol.log(err);
        });
}

//show users
const show_user = (req, res) => {
    User.find().sort({ createdAt: -1 })
        .then((result) => {
            res.send(result);
        })
        .catch(err => {
            console.log(err);
        });
}

//show user by id
const show_user_byid = (req, res) => {
    const id = req.params.id;
    User.findById(id)
        .then((result) => {
            res.send(result);
        })
        .catch(err => {
            console.log(err);
        });
}


module.exports = {

    update_user,
    show_user,
    show_user_byid,
    update_abon_user,
    UpdateEtatUser,
};

