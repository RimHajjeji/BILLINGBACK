const express = require('express');
const router = express.Router();
const DevisController = require('../controllers/DevisController');

// Routes
router.post('/add', DevisController.create_devis);

router.get('/', DevisController.show_devis);
router.get('/:id', DevisController.show_devis_byid);
router.put('/update/:id', DevisController.update_devis);
router.put('/update_etat/:id', DevisController.update_devis_etat);
router.delete('/:id', DevisController.delete_devis);
router.get('/company/:id', DevisController.Get_devis_Prix_by_company_id);
router.get('/client/:id', DevisController.Get_devis_byclient);
router.get('/oneclient/:id', DevisController.Get_ons_devis_byclient);

module.exports = router;
