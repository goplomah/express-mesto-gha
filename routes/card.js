const router = require('express').Router();
// eslint-disable-next-line import/no-extraneous-dependencies
const { Joi, celebrate } = require('celebrate');
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/card');

router.get('/', getCards);
router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required().pattern(/https?:\/\/(www\.)?([A-Za-z0-9-.]+)\.([A-Za-z0-9]+)([A-Za-z0-9-._~:/?#@!$&'()*+,;=]*)#?/),
  }),
}), createCard);
router.delete('/:_id', celebrate({
  body: Joi.object().keys({
    _id: Joi.string().required(),
  }),
}), deleteCard);
router.put('/:_id/likes', celebrate({
  body: Joi.object().keys({
    _id: Joi.string().required(),
  }),
}), likeCard);
router.delete('/:_id/likes', celebrate({
  body: Joi.object().keys({
    _id: Joi.string().required(),
  }),
}), dislikeCard);

module.exports = router;
