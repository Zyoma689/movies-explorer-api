const Movie = require('../models/movie');

const { BadRequestError } = require('../errors/400_bad-request-error');
const { ForbiddenError } = require('../errors/403_forbidden-error');
const { NotFoundError } = require('../errors/404_not-found-error');
const { ConflictError } = require('../errors/409_conflict-error');

const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .populate(['owner'])
    .then((movies) => {
      res.send(movies);
    })
    .catch(next);
};

const addMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  Movie.find({ movieId, owner: req.user._id })
    .then((addedMovie) => {
      if (addedMovie.length !== 0) {
        return next(new ConflictError('Фильм уже сохранен'));
      }
      return Movie.create({
        country,
        director,
        duration,
        year,
        description,
        image,
        trailer,
        thumbnail,
        owner: req.user._id,
        movieId,
        nameRU,
        nameEN,
      })
        .then(({ _id }) => {
          Movie.findById(_id)
            .populate(['owner'])
            .then((movie) => {
              res.send(movie);
            })
            .catch(next);
        })
        .catch((err) => {
          if (err.name === 'ValidationError') {
            next(new BadRequestError(`${Object.values(err.errors).map((error) => error.message).join(', ')}`));
          } else {
            next(err);
          }
        });
    })
    .catch(next);
};

const removeMovie = (req, res, next) => {
  const { movieId } = req.params;
  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        return next(new NotFoundError('Фильм не найден'));
      }
      if (movie.owner._id.toString() !== req.user._id) {
        return next(new ForbiddenError('Вы не можете удалять чужие фильмы'));
      }
      movie.remove();
      return res.send({ message: 'Фильм удален' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('id должен быть валидным'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getMovies,
  addMovie,
  removeMovie,
};
