const { Pet } = require('../../models');

const listPets = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const pets = await Pet.find({ owner: _id }, '', {
    skip,
    limit: Number(limit),
  }).populate('owner', '_id name');

  return pets;
};

module.exports = listPets;
