const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config(); // Permet d'acceder aux variables d'environnement
const path = require('path'); // Permet d'avoir acces aux chemins de notre systeme de fichiers
const helmet = require('helmet'); // Permet de proteger l'application de certaines vulnerabilités bien connues du web en configurant de manière appropriés les entetes HTTP
const mongoSanitize = require('express-mongo-sanitize'); // Permet d'empecher les injections 
const xss = require('xss-clean'); // Permet d'empecher l'utilisation de cross site scripting


const sauceRoutes = require('./routes/sauce'); // On importe les routes sauce
const userRoutes = require('./routes/user'); // On importe les routes user
const MONGODB_URI = process.env.MONGODB_URI ; // On stock la variable d'environnement contenant l'URI de la base de données MONGODB


// Permet de se connecter à mongoDB
mongoose.connect(MONGODB_URI,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


  const app = express();
  app.use(helmet());
 
  // permet de regler le problème de CORS (Cross Origin Resource Sharing)
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Permet à tout le monde d'acceder à l'API
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); // On donne l'autorisation d'utiliser certains Headers
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // On donne l'autorisation d'utiliser certaines methodes
    next();
  });
  
  
  app.use(express.json()); // Transforme le corps de la requete post en JSON 
  app.use(mongoSanitize());
  app.use(xss());

  app.use('/images', express.static(path.join(__dirname, 'images'))); // Permet que les requetes à /images/ servent le dossier images

  app.use('/api/auth', userRoutes); // Configure les routes user sur les requetes à /api/auth
  app.use('/api/sauces', sauceRoutes); // Configure les routes sauces sur les requêtes à /api/sauces



  module.exports = app; // On exporte l'app pour l'utiliser sur les autres fichiers