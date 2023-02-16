const { Service } = require('../../models');

const servicesList = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const services = await Service.find({}, '', {
    skip,
    limit: Number(limit),
  });
  
  return services;
};

module.exports = servicesList;
