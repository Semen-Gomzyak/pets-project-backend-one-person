const { Service } = require('../../models');

const updateCloudinaryAvatar = require('../../middlwares/uploadMiddleware');

const updateServiceAvatar = async (req, res) => {
  const serviceId = req.params.serviceId;

  const avatarURL = await updateCloudinaryAvatar(req);

  await Service.findByIdAndUpdate(serviceId, { avatarURL });

  res.status(200).json({
    id: serviceId,
    avatarURL,
  });
};

module.exports = updateServiceAvatar;
