const express = require('express');
const ServiceController = require('../Controllers/ServiceController');
const router = express.Router();

router.post('/add', ServiceController.create_service);
router.get('/show', ServiceController.show_service);
router.get('/show/service/company/:id', ServiceController.GET_service_bycompani);
router.get('/show/:id', ServiceController.show_service_byid);
router.put('/upd/:id', ServiceController.update_service);
router.put('/upd/amount/:id', ServiceController.update_service_emount);
router.delete('/delete/:id', ServiceController.delete_service);

module.exports = router;