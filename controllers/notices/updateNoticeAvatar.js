const { Notice } = require('../../models');

const updateCloudinaryAvatar = require('../../middlwares/uploadMiddleware');

const updateNoticeAvatar = async (req, res) => {
  const noticeId = req.params.petId;

  const avatarURL = await updateCloudinaryAvatar(req);

  await Notice.findByIdAndUpdate(noticeId, { avatarURL });

  res.status(200).json({
    id: noticeId,
    avatarURL,
  });
};

module.exports = updateNoticeAvatar;
