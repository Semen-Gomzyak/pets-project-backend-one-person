const { Notice } = require('../../models');
const { User } = require('../../models');

async function getFavorites(req, res) {
  const user = await User.findById(req.params.userid);
  const { favorites } = user;
  const notices = await Promise.all(
    favorites.map(noticeId => Notice.findById(noticeId)),
  );

  return notices;
}

module.exports = getFavorites;
