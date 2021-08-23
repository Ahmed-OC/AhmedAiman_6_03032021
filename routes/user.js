const express = require('express');
const router = express.Router(); // On utilise la fonction Router d'express afin de configurer les routes
const userCtrl = require('../controllers/user'); // On importe le controller des user afin de l'utiliser dans les routes


// On configure les routes pour les users
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);


module.exports = router;