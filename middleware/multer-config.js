const multer = require('multer'); // On importe multer

// On definit les mime types des fichiers images
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

// Configuration de la destination d'enregistrements des images et du nom des images par rapport à la date
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});


// on exporte notre storage avec la fonction multer à laquelle on fait passer la fonction single('image') pour dire que ce sont des fichiers images uniques
module.exports = multer({storage: storage}).single('image');