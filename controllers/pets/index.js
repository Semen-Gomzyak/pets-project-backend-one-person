const addPet = require('./addPet');
const removePet = require('./removePet');
const getPetById = require('./getPetById');
const listPets = require('./listPets');
const updatePet = require('./updatePet');
const updatePetAvatar = require('./updateAvatar');

module.exports = {
  listPets,
  getPetById,
  removePet,
  addPet,
  updatePet,
  updatePetAvatar,
};
