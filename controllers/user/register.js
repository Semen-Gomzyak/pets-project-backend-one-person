const dotenv = require('dotenv');
dotenv.config();
const { User } = require('../../models');
const bcrypt = require('bcryptjs');
const updateCloudinaryAvatar = require('../../middlwares/uploadMiddleware');
const { verificationToken } = process.env;

const register = async (req, res) => {
  const { email, password, name, cityRegion, mobilePhone, token, birthday } =
    req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.status(409).json({
      message: 'Email is already in use',
    });
  }
  const avatarURL = await updateCloudinaryAvatar(req, res);

  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  const result = await User.create({
    email,
    password: hashPassword,
    name,
    cityRegion,
    mobilePhone,
    avatarURL,
    birthday,
    token,
    verificationToken,
  });

  res.status(201).json({
    message: 'User added',
    email,
    name,
    cityRegion,
    mobilePhone,
    avatarURL,
    birthday,
  });

  return result;
};

module.exports = register;
