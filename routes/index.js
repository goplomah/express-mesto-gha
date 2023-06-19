const router = require('express').Router();
const userRouter = require('./users');
const cardRouter = require('./card');

router.get('/', (req, res) => {
  res.status(200);
  res.send('hello');
});

router.use('/users', userRouter);
router.use('/cards', cardRouter);
router.use('*', (req, res) => {
  res.status(404).send({ message: 'упс...такой странички не существует)))' });
});

module.exports = router;
