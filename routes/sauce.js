const express = require('express');
const router = express.Router(); // On utilise la fonction Router d'express afin de configurer les routes
const sauceCtrl = require('../controllers/sauce'); // on importe le controller des sauces afin de les implanter dans les routes
const multer = require('../middleware/multer-config');  // on importe le middleware de configuration de multer afin de l'utiliser pour les routes necessitant le multer
const auth = require('../middleware/auth'); // on importe le midleware d'authentification afin de securiser nos routes


// On configure les routes pour les sauces et on les securise avec l'utilisation de auth
router.get('/',auth,sauceCtrl.getAllSauces);
router.get('/:id',auth,sauceCtrl.getSauceById);
router.post('/',auth,multer, sauceCtrl.createSauce);
router.put('/:id',auth,multer,sauceCtrl.modifySauce);
router.delete('/:id',auth,sauceCtrl.deleteSauce);
router.post('/:id/like',auth,sauceCtrl.likeSauce);


module.exports = router;