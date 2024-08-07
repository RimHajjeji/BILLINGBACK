// Routes - DevisRoute.js
const express = require('express');
const DevisController = require('../Controllers/DevisController');
const router = express.Router();

router.post('/add', DevisController.create_devis);
router.get('/show', DevisController.show_devis);
router.get('/show/:id', DevisController.show_devis_byid);
router.get('/show/price/devis/:id', DevisController.Get_devis_Prix_by_company_id);
router.get('/show/devis/client/:id', DevisController.Get_devis_byclient);
router.get('/show/last/devis/company/:id', DevisController.Get_ons_devis_byclient);
router.put('/upd/:id', DevisController.update_devis);
router.put('/etats/upd/:id', DevisController.update_devis_etat);
router.delete('/delete/:id', DevisController.delete_devis);

module.exports = router;
