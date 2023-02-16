const { Pet } = require('../../models');

const updateCloudinaryAvatar = require('../../middlwares/uploadMiddleware');

const updateNoticeAvatar = async (req, res) => {
  const petId = req.params.petId;

  const avatarURL = await updateCloudinaryAvatar(req);

  await Pet.findByIdAndUpdate(petId, { avatarURL });

  res.status(200).json({
    id: petId,
    avatarURL,
  });
};

module.exports = updateNoticeAvatar;

