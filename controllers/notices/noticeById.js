const { HttpError } = require('../../helpers');
const { Notice } = require('../../models');
const { User } = require('../../models');

const getNoticeById = async (req, res, next) => {
  const noticeId = req.params.noticeId;

  if (!noticeId) {
    return next(
      HttpError(404, `Notice with id ${req.params.noticeId} can't be found`),
    );
  }
  const notice = await Notice.findById(noticeId);
  const user = await User.findById(notice.owner);

  const { mobilePhone, email } = user;
  const {
    _id,
    title,
    name,
    birthdate,
    breed,
    location,
    comments,
    price,
    category,
    favorite,
    avatarURL,
    owner,
    sex,
  } = notice;

  return {
    _id,
    title,
    name,
    birthdate,
    breed,
    location,
    comments,
    price,
    category,
    favorite,
    avatarURL,
    owner,
    sex,
    mobilePhone,
    email,
  };
};

module.exports = getNoticeById;
