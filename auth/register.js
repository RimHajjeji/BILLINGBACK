const Admin = require('../models/admin');
const validation = require('../auth/validation');
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const Company = require('../models/company')

const register_user = async (req, res) => {
    console.log('req is sq', req.body)
    //validate data 
    const { error } = validation.register_user_val(req.body.user);
    if (error) return res.status(404).send(error.details[0].message);

    //checking if email exist
    const emailExist = await User.findOne({ email: req.body.user.email });
    if (emailExist) return res.status(203).send("L'email est existe");

    //Hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashpass = await bcrypt.hash(req.body.user.password, salt);
    console.log('pass:  ', hashpass)
    console.log(req.body)
    const user = new User({
        nom: req.body.user.nom,
        prenom: req.body.user.prenom,
        email: req.body.user.email,
        password: hashpass,
        tle: req.body.user.tle,
        role: req.body.user.role,
        etats: req.body.user.etats,
        abon: req.body.user.abon,
    });
    console.log('pass:  ', req.body.company)
    user.save()
        .then((result) => {
            const com = new Company({
                userId: result._id,
                ...req.body.company
            })
            com.save()
                .then((reult) => {
                    res.status(200).send({ message: "Vous ête inscrit avec succer" })
                })
                .catch((er) => {
                    res.status(404).send(er)
                })
        })
        .catch((err) => res.status(404).send(err))
    /*  try {
         const savedUser = await user.save();
         res.send({user: user._id});
         
         }catch{
             res.status(404).send(err)
         } */


}

//validation mail
const validate_eamil = async (req, res) => {
    console.log('req is sq', req.body)
    //validate data 
    /*  const { error } = validation.register_user_val(req.body.user);
     if (error) return res.status(404).send(error.details[0].message);
  */
    //checking if email exist
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) {
        return res.status(203).send({ msg: 'emailerr register' }/* L'email est introuvable */);
    } else {
        return res.status(203).send({ msg: 'emailerr valid' });
    }

}

const register_admin = async (req, res) => {
    console.log('req is sq', req.body)
    //validate data 
    const { error } = validation.register_admin_val(req.body.user);
    if (error) return res.status(203).send(error.details[0].message);

    //checking if email exist
    const emailExist = await User.findOne({ email: req.body.user.email });
    if (emailExist) return res.status(203).send('Email already exists');

    //Hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashpass = await bcrypt.hash(req.body.user.password, salt);
    console.log('pass:  ', hashpass)
    console.log(req.body)
    const user = new User({
        nom: req.body.user.nom,
        prenom: req.body.user.prenom,
        email: req.body.user.email,
        password: hashpass,
        tle: req.body.user.tle,
        role: req.body.user.role,
        etats: req.body.user.etats,
        abon: req.body.user.abon,
    });
    console.log('pass:  ', req.body.company)
    user.save()
        .then((result) => {
            res.status(203).send({ message: "Vous ête inscrit avec succer" })
        })
        .catch((err) => res.status(203).send(err))

}

//change password
const changepassword = async (req, res) => {
    //validate data 
    const id = req.params.id
    const user = await User.findById(id);
    const { error } = validation.register_user_val(req.body.user);
    if (error) return res.status(404).send(error.details[0].message);

    //validation pass
    const validPass = await bcrypt.compare(req.body.currentPass, user.password);
    console.log('sdsdqqs', validPass, res.message);
    if (!validPass) return res.status(203).send({ msg: 'change pass err' });



    //Hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashpass = await bcrypt.hash(req.body.password, salt);
    console.log('pass:  ', hashpass)
    console.log(req.body)
    User.findByIdAndUpdate(id, {
        password: hashpass,
    })
        .then((result) => {
            res.status(200).send('utilisatuer pass updated')

        })
        .catch(err => {
            consol.log(err);
        })


}


module.exports = {
    register_user,
    register_admin,
    changepassword,
    validate_eamil,
}