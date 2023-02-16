const { News } = require('../../models');

async function findNewsByTitle(searchTitle) {
  const query = { title: { $regex: searchTitle, $options: 'i' } };
  const news = await News.find(query).exec();
  return news;
}

module.exports = findNewsByTitle;
