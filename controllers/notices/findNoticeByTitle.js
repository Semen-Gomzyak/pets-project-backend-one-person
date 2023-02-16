const { Notice } = require('../../models');

async function findNoticeByTitle(searchTitle) {
  const query = { title: { $regex: searchTitle, $options: 'i' } };
  const notices = await Notice.find(query).exec();
  return notices;
}

module.exports = findNoticeByTitle;
