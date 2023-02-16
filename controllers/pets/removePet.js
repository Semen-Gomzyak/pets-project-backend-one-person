const { Pet } = require('../../models');

const removePet = async petId => {
    const pet = await Pet.findByIdAndRemove(petId);
    return pet
}

module.exports = removePet;