const express = require('express');
const {
  addService,
  updateServiceAvatar,
  servicesList,
} = require('../../controllers/services');
const { validateBody, tryCatchWrapper } = require('../../helpers');
const { upload } = require('../../middlwares/avatar');
const { serviceValidate } = require('../../validate');
const router = express.Router();

router.post(
  '/',
  validateBody(serviceValidate),
  tryCatchWrapper(async (req, res, next) => {
    res.status(201).json(await addService(req, res));
  }),
);

router.patch(
  '/avatars/:serviceId',
  upload.single('avatar'),
  tryCatchWrapper(async (req, res, next) => {
    res.status(201).json(await updateServiceAvatar(req, res));
  }),
);

router.get('/', tryCatchWrapper(async (req, res, next) => {
  res.status(200).json(await servicesList(req, res));
}))
module.exports = router;
