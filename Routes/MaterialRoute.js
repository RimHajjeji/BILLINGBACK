const express = require('express');
const MaterialController = require('../Controllers/MaterialController');
const router = express.Router();

router.post('/add', MaterialController.create_material);
router.get('/show', MaterialController.show_material);
router.get('/show/:id', MaterialController.show_material_byid);
router.get('/show/material/company/:id', MaterialController.GET_material_bycompani);
router.put('/upd/amount/:id', MaterialController.update_material_emount);
router.put('/upd/:id', MaterialController.update_material);
router.delete('/delete/:id', MaterialController.delete_material);

module.exports = router;