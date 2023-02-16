const dotenv = require('dotenv');
dotenv.config();
const { User } = require('../../models');

async function updateUser(req, res) {
  const { email, name, cityRegion, mobilePhone, avatarURL, birthday, _id } =
    req.user;
  const userBodyUpdates = req.body;

  const id = `${_id}`
  const user = await User.findById(_id);

  const keys = Object.keys(userBodyUpdates);
  keys.forEach(key => {
    user[key] = userBodyUpdates[key];
  });

  await user.save();
  return res.status(201).json({
    message: 'User updated successfully',
    id,
    email,
    name,
    cityRegion,
    mobilePhone,
    avatarURL,
    birthday,
  });
}

module.exports = updateUser;
