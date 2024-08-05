const Admin = require('../models/admin');
const validation = require('../auth/validation');
const bcrypt = require('bcryptjs')


/* //register admin
const create_admin = (req, res) => {
    //validate data 
    const { error } = validation.register_admin_val(req.body);
    if (error) return res.status(404).send(error.details[0].message);

     //checking if email exist
     const emailExist = Admin.findOne({ email: req.body.email });
     if (emailExist) return res.status(400).send('Email already exists');

    //Hash passwords
    const salt = bcrypt.genSalt(10);
    const hashpass = bcrypt.hash(req.body.password, salt); 

    console.log(req.body)
    const admin = new Admin(req.body)
    admin.save()
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            console.log(err);
        });
}
 */


//update admin
const update_admin = (req, res) => {

    Admin.findByIdAndUpdate(req.body.id, {
        nom: req.body.nom,
        prenom: req.body.prenom,
        email: req.body.email,
        password: req.body.password,
        
    })
        .then((result) => {
            res.status(200).send('admin updated')
        })
        .catch(err => {
            consol.log(err);
        })
}

//show admin
const show_admin = (req, res) => {
    Admin.find().sort({ createdAt: -1 })
        .then((result) => {
            res.send(result);
        })
        .catch(err => {
            console.log(err);
        });
}

//show admin by id
const show_admin_byid = (req, res) => {
    const id = req.params.id;
    Admin.findById(id)
        .then((result) => {
            res.send(result);
        })
        .catch(err => {
            console.log(err);
        });
}

module.exports = {
    update_admin,
    show_admin,
    show_admin_byid,
};

