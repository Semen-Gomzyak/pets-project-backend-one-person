const dotenv = require('dotenv');
dotenv.config();
const { User } = require('../../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { SECRET } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const passCompare = bcrypt.compareSync(password, user.password);
  if (!user || !passCompare) {
    res.status(401).json({
      message: 'Email or password is wrong',
    });
  }

  const id = {
    id: user._id,
  };

  const token = jwt.sign(id, SECRET, { expiresIn: '1h' });
  await User.findByIdAndUpdate(user._id, { token });
  return res.status(200).json({
    token,
    email,  
    id: user.id
  });
};

module.exports = login;
