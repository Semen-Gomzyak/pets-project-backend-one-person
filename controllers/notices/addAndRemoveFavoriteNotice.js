const { Notice } = require('../../models');
const { User } = require('../../models');

const addAndRemoveFavoriteNotice = async (userId, noticeId) => {
  const notice = await Notice.findById(noticeId);
  const favoriteStatus = notice.favorite;
  const user = await User.findById(userId);
  console.log(user.favorites);
  const userFavorites = user.favorites || [];

  if (!favoriteStatus) {
    userFavorites.push(noticeId);
  } else {
    const index = userFavorites.indexOf(noticeId);
    if (index !== -1) {
      userFavorites.splice(index, 1);
    }
  }

  user.favorites = userFavorites;
  notice.favorite = !favoriteStatus;

  await user.save();
  await notice.save();

  return { notice, userFavorites };
};

module.exports = addAndRemoveFavoriteNotice;
