const express = require('express');
const router = express.Router();

const currentUser = require('../../middlwares/auth');
const { validateNotice } = require('../../validate/index');
const {
  validateBody,
  tryCatchWrapper,
  HttpError,
} = require('../../helpers/index');
const {
  addNotice,
  listNotices,
  getNoticeById,
  userNotices,
  removeNotice,
  addAndRemoveFavoriteNotice,
  getFavorites,
  findNoticeByTitle,
  updateNoticeAvatar,
  getByCategoryAndTitle,
} = require('../../controllers/notices');
const { upload } = require('../../middlwares/avatar');

router.post(
  '/category/:category',
  currentUser,
  validateBody(validateNotice),
  tryCatchWrapper(async (req, res, next) => {
    res.status(201).json(await addNotice(req));
  }),
);

router.get(
  '/category/:category',
  tryCatchWrapper(async (req, res, next) => {
    res.status(201).json(await listNotices(req));
  }),
);

router.get(
  '/:noticeId',
  tryCatchWrapper(async (req, res, next) => {

    res.status(200).json(await getNoticeById(req, res));
  }),
);

router.get(
  '/',
  currentUser,
  tryCatchWrapper(async (req, res, next) => {
    res.status(200).json(await userNotices(req, res));
  }),
);

router.delete(
  '/:noticeId',
  currentUser,
  tryCatchWrapper(async (req, res, next) => {
    const noticeId = req.params.noticeId;
    const searchedNotice = await getNoticeById(noticeId);

    if (!searchedNotice) {
      return next(HttpError(404, `Notice with id ${noticeId} can't be found`));
    }

    await removeNotice(noticeId);
    res.status(201).json({ message: 'Notice deleted' });
  }),
);

router.put(
  '/:userId/favorites/:noticeId',
  currentUser,
  tryCatchWrapper(async (req, res, next) => {
    const { userId, noticeId } = req.params;
    res.status(201).json(await addAndRemoveFavoriteNotice(userId, noticeId));
  }),
);

router.get(
  '/:userid/favorites',
  currentUser,
  tryCatchWrapper(async (req, res, next) => {
    res.status(200).json(await getFavorites(req, res));
  }),
);

router.get(
  '/search/:title',
  tryCatchWrapper(async (req, res, next) => {
    const title = req.params.title;
    res.status(200).json(await findNoticeByTitle(title));
  }),
);

router.patch(
  '/avatars/:noticeId',
  currentUser,
  upload.single('avatar'),
  tryCatchWrapper(updateNoticeAvatar),
);

router.get('/:category/:title', tryCatchWrapper(async (req, res, next) => {
  res.status(200).json(await getByCategoryAndTitle(req, res));
}))
module.exports = router;
