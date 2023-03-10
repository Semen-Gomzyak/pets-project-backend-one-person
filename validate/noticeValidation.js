const Joi = require('joi');

const validateNotice = Joi.object({
  title: Joi.string().min(2).max(48).required(),
  name: Joi.string().min(2).max(24).required(),
  birthdate: Joi.date().required(),
  breed: Joi.string().min(2).max(24),
  location: Joi.string().required(),
  comments: Joi.string().min(8).max(120).required(),
  price: Joi.number().positive().required(),
  gender: Joi.string(),
});

module.exports = validateNotice;
