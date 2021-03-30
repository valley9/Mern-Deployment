const PetController = require("../controllers/pet.controller");


module.exports = app => {
    app.get("/api/pets/all", PetController.findAllPets)
    app.post("/api/pets/create", PetController.addPet)
    app.get("/api/pets/:petid", PetController.findOnePet)
    app.put("/api/pets/update/:petid", PetController.updateOnePet)
    app.delete("/api/pets/delete/:petid", PetController.deletePet)
}