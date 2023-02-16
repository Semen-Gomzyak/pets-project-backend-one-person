const { User } = require('../../models');

const updateCloudinaryAvatar = require('../../middlwares/uploadMiddleware');

const updateUserAvatar = async (req, res) => {
  const userId = req.params.userId;

  const avatarURL = await updateCloudinaryAvatar(req);

  await User.findByIdAndUpdate(userId, { avatarURL });

  res.status(200).json({
    id: userId,
    avatarURL,
  });
};

module.exports = updateUserAvatar;
