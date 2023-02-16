const addNotice = require('./addNotice');
const listNotices = require('./noticesByCategory');
const getNoticeById = require('./noticeById');
const userNotices = require('./userNotices');
const removeNotice = require('./removeNotice');
const addAndRemoveFavoriteNotice = require('./addAndRemoveFavoriteNotice');
const getFavorites = require('./getFavoriteNotices');
const findNoticeByTitle = require('./findNoticeByTitle');
const updateNoticeAvatar = require('./updateNoticeAvatar');
const getByCategoryAndTitle = require('./getByCategoryAndTitle')

module.exports = {
  addNotice,
  listNotices,
  getNoticeById,
  userNotices,
  removeNotice,
  addAndRemoveFavoriteNotice,
  getFavorites,
  findNoticeByTitle,
  updateNoticeAvatar,
  getByCategoryAndTitle
};
