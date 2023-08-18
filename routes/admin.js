const express = require('express');

const adminRoutes = express.Router();

const adminController = require('../controllers/admin');

adminRoutes.get('/signup',adminController.viewSignUp);

adminRoutes.post('/signup', adminController.signup);

adminRoutes.post('/login', adminController.login);

module.exports = adminRoutes;