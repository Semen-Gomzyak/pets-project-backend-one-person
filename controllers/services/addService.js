const { Service } = require('../../models');

const addService = async (req, res) => {
  const newService = await Service.create({ ...req.body });
  return newService;
};

module.exports = addService;
