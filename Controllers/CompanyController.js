const mongoose = require('mongoose');
const Company = require('../models/company');
const User = require('../models/user')
const Grid = require('gridfs-stream')

//add company
const create_company = (req, res) => {
    console.log('comapny req', req.body)
    const company = new Company({
        raison_sociale: req.body.raison_sociale,
        /*  activite: req.body.activite,
         pays: req.body.pays, */
        fax: req.body.fax,
        tel: req.body.tel,
        web: req.body.web,
        mf: req.body.mf,
        email: req.body.email,
        address: req.body.address,
        rib: req.body.rib,
        image: req.file
    })
    company.save()
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            console.log(err);
        });
}

//show company
const show_company = async (req, res) => {
    await Company.find().sort({ createdAt: -1 }).populate('userId')
        .then((result) => {
            res.send(result);
        })
        .catch(err => {
            console.log(err);
        });
}

//show company by id
const show_company_byid = (req, res) => {
    const id = req.params.id;
    Company.findById(id)
        .then((result) => {
            res.send(result);
        })
        .catch(err => {
            console.log(err);
        });
}

//update company
const update_company = (req, res) => {
    const id = req.params.id;
    console.log('resqsd', req.body)
    Company.findByIdAndUpdate(id, {
        raison_sociale: req.body.raison_sociale,
        /* activite: req.body.activite,
        pays: req.body.pays, */
        tle: req.body.tle,
        fax: req.body.fax,
        web: req.body.web,
        mf: req.body.mf,
        address: req.body.address,
        /* c_tva: req.body.c_tva, */
        rib: req.body.rib,
        email: req.body.email,

    })
        .then((result) => {
            res.status(200).send('company updated')
        })
        .catch(err => {
            consol.log(err);
        });
}

//delete company
const delete_company = (req, res) => {
    const id = req.params.id;
    Company.findByIdAndDelete(id)
        .then((result) => {
            res.status(200).send('company deleted')
        })
        .catch(err => {
            consol.log(err);
        });
}

const GET_company_byUser = async (req, res) => {
    const id = req.params.id
    await Company.find({ userId: id }).populate('userId')
        .then((result) => {
            res.status(200).send(result)
        })
        .catch(err => {
            console.log(err);
        })
}
/* const test = (req, res) => {
    const id = req.params.id;
    User.findById(id)
        .then((responce) => {
            let nom = responce.nom
            Company.find({ userId: id })
                .then((responce2) => {
                    
                    
                    let obje = responce2
                      objs=obje.map(el=>{
                          console.log('nomm',nom)
                       ( {...el,owner:nom})
                      })
                   //  obje=obje.map((el)=>{
                       console('eleme',el)
                    }) //
                    console.log('namess',objs)
                    res.status(200).send(obje.map(el=>el))
                })
                .catch(err => {
                    consol.log(err);
                });

        })
        .catch(err => {
            consol.log(err);
        });

} */
/* get company image */
const UpdateCompanyImage = async (req, res) => {
    const { id } = req.body
    await Company.findByIdAndUpdate(id, {
        image: req.file
    }).then((resp) => {
        res.status(200).send({ message: 'iamge updated' })
    }).catch((err) => {
        res.status(400).send(err)
    })
}
const getCompanyImage = (req, res) => {
    const db = process.env.MONGO_URI
    const conn = mongoose.createConnection(db)
    conn.once('open', async () => {
        let gfs = Grid(conn?.db, mongoose.mongo)
        gfs.collection('company')
        gfs.files.findOne({ filename: req.params.filename }, async (err, file) => {
            if (!file || file?.length === 0)
                return res.status(404).json({
                    err: 'No file exsits'
                })
            if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
                console.log(file)
                const readstream = await gfs.createReadStream(file.filename)
                readstream.pipe(res)
            }
            else {
                res.status(404).json({
                    err: "Not an image"
                })
            }
        })
    })
}

module.exports = {
    create_company,
    show_company,
    show_company_byid,
    update_company,
    delete_company,
    GET_company_byUser,
    getCompanyImage,
    UpdateCompanyImage

};