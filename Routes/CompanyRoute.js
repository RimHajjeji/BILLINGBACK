const express = require('express');
const CompanyController = require('../Controllers/CompanyController');
const router = express.Router();
const upload = require('../middleware/imageUpload')
router.post('/add', CompanyController.create_company);
router.post('/img_add', [upload.single('file')], CompanyController.UpdateCompanyImage)
router.get('/show', CompanyController.show_company);
router.get('/show/:id', CompanyController.show_company_byid);
router.get('/show/user/company/:id', CompanyController.GET_company_byUser);
/* router.get('/show/user/:id', CompanyController.test); */
router.get('/get_company/image/:filename', CompanyController.getCompanyImage)
router.put('/upd/:id', CompanyController.update_company);
router.delete('/delete/:id', CompanyController.delete_company);

module.exports = router;