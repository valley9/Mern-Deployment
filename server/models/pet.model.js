const mongoose = require('mongoose');
// const uniqueValidator = require('mongoose-unique-validator');

const PetSchema = new mongoose.Schema({
    pet_name: {
        type: String,
        unique: true,
        required: [true, "Name needs to be filled out!"],
        minLength: [3, "Name should have more than 3 characters"]
    },
    pet_type: {
        type: String,
        required: [true, "Type needs to be filled out"],
        minLength: [3, "Type should have more than 3 characters"]
    },
    pet_desc: {
        type: String,
        required: [true, "Description needs to be filled out"],
        minLength: [5, "Description should have more than 5 characters"]
    },
    pet_skill_1: {
        type: String
    },
    pet_skill_2: {
        type: String
    },
    pet_skill_3: {
        type: String
    }
});

// PetSchema.plugin(uniqueValidator, { message: 'Name must be unique'});

const Pet = mongoose.model("Pet", PetSchema)

module.exports = Pet;