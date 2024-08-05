const express = require('express');
const register = require('../../auth/register');
const router = express.Router();

router.post('/admin', register.register_admin);
router.post('/user', register.register_user);
router.post('/user/checkmail', register.validate_eamil)
router.put('/upd/pass/:id', register.changepassword);
module.exports = router;