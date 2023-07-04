const router = require('express').Router();
// eslint-disable-next-line import/no-extraneous-dependencies
const { Joi, celebrate } = require('celebrate');
const userRouter = require('./users');
const cardRouter = require('./card');
const { login, createUser } = require('../controllers/users');
const { auth } = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');
const regex = require('../utils/regex');

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);
router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(regex),
  }),
}), createUser);
router.use('/users', auth, userRouter);
router.use('/cards', auth, cardRouter);
// eslint-disable-next-line no-unused-vars
router.use('*', (req, res, next) => next(new NotFoundError('упс...такой странички не существует)))')));

module.exports = router;
