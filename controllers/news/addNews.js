const { News } = require('../../models');

const addNews = async (req, res) => {
  const newNews = await News.create({ ...req.body });
  return newNews;
};

module.exports = addNews;
