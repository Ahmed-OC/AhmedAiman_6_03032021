const Sauce = require('../models/sauce'); // On importe le modele des sauces
const fs = require('fs'); // Permet d'intéragir avec les fichiers du système, ici permet de supprimer les images


// Permet de recupérer toutes les sauces
exports.getAllSauces = (req, res, next) => {
    Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }))
}

// Permet de récupérer la sauce selon l'ID
exports.getSauceById = (req, res, next) => {
    Sauce.findOne({_id: req.params.id})
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({error}));
}


// Permet de créer une sauce 
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce)
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes : 0,
        dislikes : 0,
        usersLiked : [],
        usersDisliked : []
    });

    sauce.save()
        .then(() => res.status(201).json({message:"Objet enregistré"}))
        .catch(error => res.status(404));

}

// Permet de modifier une sauce
exports.modifySauce = (req, res, next) => {
     // supprime l'ancienne photo si une nouvelle photo est émise lors de la modification
    if(req.file){
       Sauce.findOne({_id : req.params.id})
    .then(sauce => {
        const filename = sauce.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () =>{

        });
    })
    .catch(error => res.status(500).json({ error })) 
    }
    // modification lorsqu'une image est présente sinon lorsque il n'y en a pas 
    const sauceObject = req.file ? 
    {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {...req.body}
    Sauce.updateOne( {_id : req.params.id}, {...sauceObject, _id : req.params.id})
    .then(() => res.status(200).json({ message: 'Objet modifié'}))
    .catch(error => res.status(400).json({error}));

}


// Permet de supprimer une sauce
exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({_id : req.params.id})
    .then(sauce => {
        const filename = sauce.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () =>{
            Sauce.deleteOne({ _id: req.params.id})
            .then(() => res.status(200).json({ message: 'Objet supprimé'}))
            .catch(error => res.status(400).json({error}));

        });
    })
    .catch(error => res.status(500).json({ error }))
}


// Permet de like ou dislike une sauce avec modification des listes userliked et userdisliked
exports.likeSauce = (req, res, next) => {
    const like = req.body.like;

    if ( like ===1 )
    {
        Sauce.findOne({_id : req.params.id})
        .then(sauce=> {
            
                Sauce.updateOne({_id : req.params.id},
                    {
                        $inc : {likes : 1},
                        $push : { usersLiked : req.body.userId}
                    })
                    .then(() => res.status(200).json({ message: "Like ajouté"}))
                    .catch(error => res.status(400).json({error}));
            
            
        })
        .catch(error => res.status(400).json({error}))
    }  
    if (like ===0 )
    {
        Sauce.findOne({_id : req.params.id})
        .then(sauce=> {
            if ( sauce.usersLiked.includes(req.body.userId))
            {
                Sauce.updateOne({_id : req.params.id},
                    {
                        $inc : { likes : -1},
                        $pull : { usersLiked : req.body.userId}
                    })
                    .then(() => res.status(200).json({ message: 'Like supprimé'}))
                    .catch(error => res.status(400).json({error}));
            }
            if( sauce.usersDisliked.includes(req.body.userId))
            {
                Sauce.updateOne({_id : req.params.id},
                    {
                        $inc : { dislikes : -1},
                        $pull : { usersDisliked : req.body.userId}
                    })
                    .then(() => res.status(200).json({ message: 'Dislike supprimé'}))
                    .catch(error => res.status(400).json({error}));
            }
        })
        .catch(error => res.status(400).json({error}))
    }
    if (like ===-1)
    {
        Sauce.findOne({_id : req.params.id})
        .then(sauce=> {
                Sauce.updateOne({_id : req.params.id},
                    {
                        
                        $inc : {dislikes : 1},
                        $push : { usersDisliked : req.body.userId}
                    })
                    .then(() => res.status(200).json({ message: "Dislike ajouté"}))
                    .catch(error => res.status(400).json({error}));

        })
        .catch(error => res.status(400).json({error}))
    }
}

    

