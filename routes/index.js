const router = require('express').Router();

const userRouter = require('./users');
const movieRouter = require('./movies');

const { NotFoundError } = require('../errors/404_not-found-error');

router.use('/users', userRouter);
router.use('/movies', movieRouter);
router.use('*', () => {
  throw new NotFoundError('Запрашиваемый ресурс не существует');
});

module.exports = router;
