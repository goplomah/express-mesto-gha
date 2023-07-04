const { Joi, celebrate } = require('celebrate');
const regexUrl = require('../utils/regex');

const createCardValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required().pattern(regexUrl),
  }),
});

const deleteCardValidation = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().required().hex().length(24),
  }),
});

const likeCardValidation = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().required().hex().length(24),
  }),
});

const dislikeCardValidation = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().required().hex().length(24),
  }),
});

const getUserByIdValidation = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().required().hex().length(24),
  }),
});

const updateProfileValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
});

const updateAvatarValidation = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(regexUrl),
  }),
});

const loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const createUserValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(regexUrl),
  }),
});

module.exports = {
  createCardValidation,
  deleteCardValidation,
  likeCardValidation,
  dislikeCardValidation,
  getUserByIdValidation,
  updateProfileValidation,
  updateAvatarValidation,
  loginValidation,
  createUserValidation,
};
