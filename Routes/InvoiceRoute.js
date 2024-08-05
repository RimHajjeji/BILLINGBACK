const express = require('express');
const InvoiceController = require('../Controllers/InvoiceController');
const router = express.Router();

router.post('/add', InvoiceController.create_invoice);
router.get('/show', InvoiceController.show_invoice);
router.get('/show/:id', InvoiceController.show_invoice_byid);
/* router.get('/show/company/:id', InvoiceController.Get_invoice_by_company_id); */
router.get('/show/price/facture/:id', InvoiceController.Get_invoice_Prix_by_company_id);
router.get('/show/facture/client/:id', InvoiceController.Get_invoice_byclient);
router.get('/show/last/facture/company/:id', InvoiceController.Get_ons_invoice_byclient);
router.put('/upd/:id', InvoiceController.update_invoice);
router.put('/etats/upd/:id', InvoiceController.update_invoice_etat);

router.delete('/delete/:id', InvoiceController.delete_invoice);


module.exports = router;