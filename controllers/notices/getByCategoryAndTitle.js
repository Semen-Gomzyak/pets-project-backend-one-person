const { Notice } = require('../../models');

async function getByCategoryAndTitle(req, res) {
  const { page = 1, limit = 10, title, category } = req.query;
  const skip = (page - 1) * limit;
  const query = {
    category: { $regex: category, $options: 'i' },
    title: { $regex: title, $options: 'i' },
  };
  const notices = await Notice.find(query, '', {
    skip,
    limit: Number(limit),
  }).populate('category');
  return notices;
}

module.exports = getByCategoryAndTitle;
