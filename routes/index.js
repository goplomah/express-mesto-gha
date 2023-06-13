const router  = require('express').Router();
const userRouter = require('./users');
// const cardRouter = require('./card');

router.get('/', (req, res) => {
  res.status(200);
  res.send('hello');
})

router.use('/users', userRouter);
// router.use(cardRouter);

module.exports = router;
