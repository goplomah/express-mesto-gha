const router = require('express').Router();
// eslint-disable-next-line import/no-extraneous-dependencies
const { Joi, celebrate } = require('celebrate');
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/card');
const regex = require('../utils/regex');

router.get('/', getCards);
router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required().pattern(regex),
  }),
}), createCard);
router.delete('/:_id', celebrate({
  params: Joi.object().keys({
    _id: Joi.string().required().hex(),
  }),
}), deleteCard);
router.put('/:_id/likes', celebrate({
  params: Joi.object().keys({
    _id: Joi.string().required().hex(),
  }),
}), likeCard);
router.delete('/:_id/likes', celebrate({
  params: Joi.object().keys({
    _id: Joi.string().required().hex(),
  }),
}), dislikeCard);

module.exports = router;
