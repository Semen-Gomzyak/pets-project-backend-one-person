const { Notice } = require('../../models');
const updateCloudinaryAvatar = require('../../middlwares/uploadMiddleware');

const addNotice = async (req, res) => {
  const { _id } = req.user;
  const { category } = req.params;
  const imageUrl = await updateCloudinaryAvatar(req, res);

  const newNotice = await Notice.create({
    ...req.body,
    category,
    owner: _id,
    imageUrl,
  });
  return newNotice;
};

module.exports = addNotice;
