const express = require('express');
const AdminController = require('../Controllers/AdminController');
const router = express.Router();

/* router.post('/add', AdminController.create_admin); */
router.put('/upd', AdminController.update_admin );
router.get('/show', AdminController.show_admin );
router.get('/show/:id', AdminController.show_admin_byid );
module.exports = router;