const register = require('./register');
const login = require('./login');
const getCurrentUser = require('./getCurrentUser');
const logout = require('./logout');
const updateUser = require('./updateUser');
const updateUserAvatar = require('./updateAvatar');

module.exports = {
  register,
  login,
  getCurrentUser,
  logout,
  updateUser,
  updateUserAvatar,
};
