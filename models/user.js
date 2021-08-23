const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator'); // Permet de verifier que l'utilisateur est unique afin de ne pas créer de doubler et de remonter les erreurs
const mongooseerrors = require('mongoose-errors'); // Permet de remonter les erreurs issue de la base de données

// On crée le schéma pour l'utilisateur 
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator);
userSchema.plugin(mongooseerrors);

// On exporte le model afin de l'utilliser 
module.exports = mongoose.model('User', userSchema);