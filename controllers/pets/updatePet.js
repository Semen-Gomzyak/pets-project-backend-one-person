const { Pet } = require('../../models');

const updatePet = async (req, res) => {
  const petId = req.params.petId;
  const petBodyUpdates = req.body;

  const pet = await Pet.findById(petId);

  const keys = Object.keys(petBodyUpdates);
  keys.forEach(key => {
    pet[key] = petBodyUpdates[key];
  });

const {name, date, breed, comments, favorite, avatarURL, owner} = pet
  await pet.save();
  return res.status(201).json({
    message: 'Pet updated successfully',
    name,
    date,
    breed,
    comments,
    favorite,
    avatarURL,
    owner
  });
};

module.exports = updatePet;
