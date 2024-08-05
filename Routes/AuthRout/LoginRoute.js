const express = require('express');
const login = require('../../auth/login');
const { route } = require('../UserRoute');
const router = express.Router();

router.post('/admin', login.admin_login);
router.post('/user', login.login_user)
router.post('/refresh', login.refreshToken)
router.post('/logout', login.logout)
module.exports = router;