const express = require('express');
const router = express.Router();

const controller = require('../controllers/signup');

router.get('/signup', controller.viewSignUp);
router.post('/signup', controller.signup);

router.get('/login', controller.viewLogin);
router.post('/login', controller.login);


module.exports = router;