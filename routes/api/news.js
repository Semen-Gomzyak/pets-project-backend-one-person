const express = require('express');
const { newsList, addNews, findNewsByTitle } = require('../../controllers/news');
const router = express.Router();

const { validateBody, tryCatchWrapper } = require('../../helpers');
const { newsValidate } = require('../../validate');

router.post(
  '/',
  validateBody(newsValidate),
  tryCatchWrapper(async (req, res, next) => {
    res.status(201).json(await addNews(req, res));
  }),
);

router.get(
  '/',
  tryCatchWrapper(async (req, res, next) => {
    res.status(200).json(await newsList(req, res));
  }),
);

router.get(
  '/:title',
  tryCatchWrapper(async (req, res, next) => {
    const title = req.params.title;
    res.status(200).json(await findNewsByTitle(title));
  }),
);

module.exports = router;
