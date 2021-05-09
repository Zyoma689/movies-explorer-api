const router = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');

const { createUser, login, logout } = require('../controllers/users');
const { createUserValidator, loginValidator } = require('../utils/celebrate-validators');
const { NotFoundError } = require('../errors/404_not-found-error');

router.post('/signup', createUserValidator, createUser);
router.post('/signin', loginValidator, login);
router.post('/signout', logout);
router.use('/users', userRouter);
router.use('/movies', movieRouter);
router.use('*', () => {
  throw new NotFoundError('Запрашиваемый ресурс не существует');
});

module.exports = router;
