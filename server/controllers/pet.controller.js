const Pet = require('../models/pet.model')

module.exports.findAllPets = (req, res)=>{
    Pet.find()
        .then(allpets => {
            res.json({results: allpets})
        })
        .catch(err => res.json(err))
}

module.exports.addPet = (req, res)=>{
    Pet.create(req.body)
        .then(newPet => res.json({results: newPet}))
        .catch(err => res.status(400).json(err));
}

module.exports.findOnePet = (req, res)=>{
    Pet.findOne({_id: req.params.petid})
        .then(onePet => res.json({results: onePet}))
        .catch(err => res.json(err))
}

module.exports.updateOnePet = (req, res)=>{
    console.log(req.body)
    Pet.findOneAndUpdate(
        {_id: req.params.petid},
        req.body,
        {runValidators:true})
        .then(updatedPet => res.json({results: updatedPet}))
        .catch(err => res.json(err))
}

module.exports.deletePet = (req, res)=>{
    Pet.deleteOne({_id: req.params.petid})
        .then(deletedPet => res.json({results: deletedPet}))
        .catch(err => res.json(err))
}
