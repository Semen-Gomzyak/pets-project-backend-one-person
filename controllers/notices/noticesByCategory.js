const { Notice } = require('../../models');

const listNotices = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const { category } = req.params;
  const notice = await Notice.find({category}, '', {
    skip,
    limit: Number(limit),
  }).populate('category');

  return notice;
};

module.exports = listNotices;