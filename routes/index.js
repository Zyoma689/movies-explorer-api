const router = require('express').Router();

const userRouter = require('./users');
const movieRouter = require('./movies');

router.use('/users', userRouter);
router.use('/movies', movieRouter);
router.use('*', () => {
  throw new Error('Запрашиваемый ресурс не существует');
});

module.exports = router;
