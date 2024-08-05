const express = require('express');
const UserController = require('../Controllers/UserController');
const router = express.Router();
const AuthMiddlewear = require('../middleware/authmiddlewear')

router.put('/upd/:id', UserController.update_user);
router.put('/upd/abon/:id', UserController.update_abon_user);
router.put('/upd/etat/:id', UserController.UpdateEtatUser)
router.get('/show', [AuthMiddlewear.verifyToken], UserController.show_user);
router.get('/show/:id', UserController.show_user_byid);
module.exports = router;