const express = require('express');
const router = express.Router();

const {
  register,
  login,
  getCurrentUser,
  logout,
  updateUser,
  updateUserAvatar,
} = require('../../controllers/user/index');
const updateToken = require('../../controllers/user/updateToken');

const { validateBody, tryCatchWrapper } = require('../../helpers/index');
const auth = require('../../middlwares/auth');
const { upload } = require('../../middlwares/avatar');
const {
  loginValidation,
  validateRegistration,
} = require('../../validate/index');

router.post(
  '/signup',
  validateBody(validateRegistration),
  tryCatchWrapper(register),
);


router.post('/login', validateBody(loginValidation), tryCatchWrapper(login));

router.get('/current', auth, tryCatchWrapper(getCurrentUser));

router.get('/logout', auth, tryCatchWrapper(logout));

router.put('/update', auth, tryCatchWrapper(updateUser));

router.put('/token', tryCatchWrapper(updateToken));

router.patch(
  '/avatars',
  auth,
  upload.single('avatar'),
  tryCatchWrapper(updateUserAvatar),
);

module.exports = router;
