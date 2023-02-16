const { News } = require('../../models');

const newsList = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const services = await News.find({}, '', {
    skip,
    limit: Number(limit),
  });
  return services;
};

module.exports = newsList;
