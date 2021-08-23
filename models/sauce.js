const mongoose = require('mongoose');
const mongooseerrors = require('mongoose-errors'); // Permet de remonter les erreurs issue de la base de données

// On crée un schéma pour les sauces
const sauceSchema = mongoose.Schema({
  userId: {type: String, required: true},
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  description : { type: String, required: true },
  mainPepper : { type: String, required: true },
  imageUrl : { type: String, required: true },
  heat  : { type: Number, required: true },
  likes  : { type: Number, required: false },
  dislikes  : { type: Number, required: false },
  usersLiked  : { type: [String] , required: false },
  usersDisliked  : { type: [String], required: false },
});
sauceSchema.plugin(mongooseerrors);
// On exporte le schéma pour pouvoir l'utilliser 
module.exports = mongoose.model('Sauce', sauceSchema);