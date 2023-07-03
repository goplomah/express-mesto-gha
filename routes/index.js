const router = require('express').Router();
// eslint-disable-next-line import/no-extraneous-dependencies
const { Joi, celebrate } = require('celebrate');
const userRouter = require('./users');
const cardRouter = require('./card');
const { login, createUser } = require('../controllers/users');
const { auth } = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');

// router.get('/', (req, res) => {
//   res.status(200);
//   res.send('hello');
// });

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
    avatar: Joi.string().pattern(/https?:\/\/(www\.)?([A-Za-z0-9-.]+)\.([A-Za-z0-9]+)([A-Za-z0-9-._~:/?#@!$&'()*+,;=]*)#?/),
  }),
}), createUser);
router.use('/users', auth, userRouter);
router.use('/cards', auth, cardRouter);
router.use('*', () => {
  throw new NotFoundError('упс...такой странички не существует)))');
});

module.exports = router;
