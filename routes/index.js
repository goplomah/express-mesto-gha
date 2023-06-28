const router = require('express').Router();
const userRouter = require('./users');
const cardRouter = require('./card');
const { login, createUser } = require('../controllers/users');
const { auth } = require('../middlewares/auth');

router.get('/', (req, res) => {
  res.status(200);
  res.send('hello');
});

router.post('/signin', login);
router.post('/signup', createUser);
router.use('/users', auth, userRouter);
router.use('/cards', auth, cardRouter);
router.use('*', (req, res) => {
  res.status(404).send({ message: 'упс...такой странички не существует)))' });
});

module.exports = router;
