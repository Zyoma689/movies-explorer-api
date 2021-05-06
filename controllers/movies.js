const Movie = require('../models/movie');

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
      if (addedMovie) {
        return next(new Error('Фильм уже сохранен'));
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
        .catch(next);
    })
    .catch(next);
};

const removeMovie = (req, res, next) => {
  const { movieId } = req.params;
  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        return next(new Error('Фильм не найден'));
      }
      if (movie.owner._id.toString() !== req.user._id) {
        return next(new Error('Вы не можете удалять чужие фильмы'));
      }
      return Movie.findByIdAndRemove(movieId)
        .then(() => {
          res.send({ message: 'Фильм удален' });
        })
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new Error('id должен быть валидным'));
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
