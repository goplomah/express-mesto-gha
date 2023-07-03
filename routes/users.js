const router = require('express').Router();
// eslint-disable-next-line import/no-extraneous-dependencies
const { Joi, celebrate } = require('celebrate');
const {
  getUsers, getUserById, updateProfile, updateAvatar, getInfoCurrentUser,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getInfoCurrentUser);
router.get('/:_id', celebrate({
  params: Joi.object().keys({
    _id: Joi.string().required(),
  }),
}), getUserById);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
}), updateProfile);
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required(),
  }),
}), updateAvatar);

module.exports = router;
