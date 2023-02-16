const dotenv = require('dotenv');
dotenv.config();

const getCurrentUser = (req, res) => {
  const { email, name, cityRegion, mobilePhone, avatarURL, birthday, _id } =
    req.user;

  const id = `${_id}`;
  res.status(200).json({
    id,
    email,
    name,
    cityRegion,
    mobilePhone,
    avatarURL,
    birthday,
  });
};

module.exports = getCurrentUser;
