const { Pet } = require('../../models');
const updateCloudinaryAvatar = require('../../middlwares/uploadMiddleware');

const addPet = async (req, res) => {
  const { _id } = req.user;

  const imageUrl = await updateCloudinaryAvatar(req, res);

  const newPet = await Pet.create({ ...req.body, owner: _id, imageUrl });
  return newPet;
};

module.exports = addPet;
