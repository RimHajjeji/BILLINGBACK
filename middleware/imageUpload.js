const multer = require('multer')
const path = require('path')
const crypto = require('crypto')
const config = require('../Config/db')
const { GridFsStorage } = require('multer-gridfs-storage')
const storage = new GridFsStorage({
    url: process.env.MONGO_URI,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err)
                }
                const filename = buf.toString('hex') + path.extname(file.originalname)
                const fileInfo = {
                    filename: filename,
                    bucketName: 'company'
                }
                resolve(fileInfo)
                console.log('fileinfo', fileInfo)
            })
        })
    }
})
const upload = multer({ storage })
module.exports = upload