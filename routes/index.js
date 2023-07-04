const router = require('express').Router();
// eslint-disable-next-line import/no-extraneous-dependencies
const userRouter = require('./users');
const cardRouter = require('./card');
const { login, createUser } = require('../controllers/users');
const { auth } = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');
const { loginValidation, createUserValidation } = require('../middlewares/validationRoutes');

router.post('/signin', loginValidation, login);
router.post('/signup', createUserValidation, createUser);
router.use('/users', auth, userRouter);
router.use('/cards', auth, cardRouter);
// eslint-disable-next-line no-unused-vars
router.use('*', (req, res, next) => next(new NotFoundError('упс...такой странички не существует)))')));

module.exports = router;
