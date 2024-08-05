const Admin = require('../models/admin');
const validation = require('../auth/validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AuthService = require('../service/auth.service')
const User = require('../models/user')
const dotenv = require('dotenv');
const { isNull } = require('lodash');
dotenv.config()
const secret_refresh = process.env.REFRESH_TOKEN_KEY
const admin_login = async (req, res) => {
    //validation of data 
    try {
        const { error } = await validation.login_val(req.body);
        if (error) return res.status(203).send(error.details[0].message);
        //check if the email exists
        const admin = await Admin.findOne({ email: req.body.email });
        if (!admin) return res.status(203).send("L'email est introuvable");

        //password is correct
        const validPass = await bcrypt.compare(req.body.password, admin.password);
        console.log(validPass);
        if (!validPass) return res.status(203).send('Mot de passe incorrect ');
        //cerate and assing a token
        let accessToken = AuthService.accessToken(admin)
        let refreshToken = AuthService.refreshToken(admin)
        res.status(200).cookie('refreshToken', refreshToken, { httpOnly: true, expires: new Date(new Date().getTime() + (3600 * 24 * 2 * 1000)) })
            .send({
                new: admin.new,
                accessToken: accessToken,
                /*  refreshToken: refreshToken, */

                profile: admin.profile
            });
    }

    catch (err) {
        res.status(203).send({ message: "Erreur lors la connexion " });
        console.log(err)
    }
};
const refreshToken = async (req, res) => {
    if (req.cookies.refreshToken !== undefined) {
        let user = null
        await User.findById(req.cookies.refreshToken).then(myuser => user = myuser).catch(err => res.status(400).send(err))
        if (!user?._id)
            res.status(400).send({ message: 'no user' })
        else {
            jwt.verify(user?.token, secret_refresh, async (err, decode) => {
                if (err)
                    return res.status(400).send({ message: 'Token expired' })
                else {
                    let accessToken = AuthService.accessToken(user)
                    res.status(200).send({
                        new: user,
                        accessToken: accessToken,
                    })
                }
            })
        }
        /*  jwt.verify(req.cookies.refreshToken, secret_refresh, async (err, decode) => {
             if (err)
                 return res.status(401).send({ message: 'refresh expired' })
             else {
                 var decodedHeader = jwt.decode(req.cookies.refreshToken, { header: true });
                 let user = null
                 console.log('req.sss', decodedHeader)
                 await User.findById(decodedHeader).exec().then((ress) => {
                     user = ress
                 })
                 if (user?._id) {
                     jwt.verify
                     let accessToken = AuthService.accessToken(user)
                     console.log('users', accessToken)
                     res.status(200).send({
                         new: user,
                         accessToken: accessToken,
                     })
                 }
                 else
                     res.status(400).send({ message: 'No user' })
             }
         }) */
    }
    else
        res.status(402).send({ message: 'no refresh provided' })

}
const login_user = async (req, res) => {
    try {
        const { error } = await validation.login_val(req.body);
        if (error) return res.status(203).send({ message: error });
        //check if the email exists
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(203).send({ msg: 'emailerr login' }/* L'email est introuvable */);
        /* console.log('loginsdsqqsd', user) */
        //password is correct
        const validPass = await bcrypt.compare(req.body.password, user.password);
        console.log('sdsdqqs', validPass, res.message);
        if (!validPass) return res.status(203).send({ msg: 'Mot de passe incorrect' });
        if (user.etats === true) {
            console.log(req.body);
            let accessToken = AuthService.accessToken(user)
            let refreshToken = AuthService.refreshToken(user)
            const updata = await User.findByIdAndUpdate(user?._id, {
                token: refreshToken
            })
            res.status(200).cookie('refreshToken', String(user?._id), { httpOnly: true, expires: new Date(new Date().getTime() + (3600 * 24 * 2 * 1000)) })
                .send({
                    new: user,
                    accessToken: accessToken,
                    /*  refreshToken: refreshToken, */
                    profile: user.profile
                });
        }
        else res.status(203).send({ msg: 'block' });
    }
    catch (err) {
        res.status(400).send({ message: "Erreur lors la connexion" });
        console.log(err)
    }
}
const logout = async (req, res) => {
    User.findByIdAndUpdate(req.cookies.refreshToken, {
        token: null
    }).then((response) => {
        res.status(200).send({ message: 'user logout ' })
    })
        .catch((err) => {
            res.status(400).send(err)
        })
}



module.exports = {
    admin_login,
    login_user,
    refreshToken,
    logout
}