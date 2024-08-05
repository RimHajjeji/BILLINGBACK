const express = require('express');
const ClientController = require('../Controllers/ClientController');
const router = express.Router();

router.post('/add', ClientController.create_client);
router.get('/show', ClientController.show_client);
router.get('/show/:id', ClientController.show_client_byid);
router.get('/show/client/company/:id', ClientController.Get_client_bycompany);
router.put('/upd/:id', ClientController.update_client);
router.put('/upd/etat/:id', ClientController.UpdateEtatClient)
router.delete('/delete/:id', ClientController.delete_client);

module.exports = router;