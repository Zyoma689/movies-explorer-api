const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, 'Поле обязательно для заполнения'],
  },
  director: {
    type: String,
    required: [true, 'Поле обязательно для заполнения'],
  },
  duration: {
    type: Number,
    required: [true, 'Поле обязательно для заполнения'],
  },
  year: {
    type: String,
    required: [true, 'Поле обязательно для заполнения'],
  },
  description: {
    type: String,
    required: [true, 'Поле обязательно для заполнения'],
  },
  image: {
    type: String,
    required: [true, 'Поле обязательно для заполнения'],
    validate: {
      validator: (v) => /https?:\/\/(www\.)?([-\w.:])+([-\w._~:/?#[\]@!$&'()*+,;=])*/ig.test(v),
      message: 'URL должен быть валидным',
    },
  },
  trailer: {
    type: String,
    required: [true, 'Поле обязательно для заполнения'],
    validate: {
      validator: (v) => /https?:\/\/(www\.)?([-\w.:])+([-\w._~:/?#[\]@!$&'()*+,;=])*/ig.test(v),
      message: 'URL должен быть валидным',
    },
  },
  thumbnail: {
    type: String,
    required: [true, 'Поле обязательно для заполнения'],
    validate: {
      validator: (v) => /https?:\/\/(www\.)?([-\w.:])+([-\w._~:/?#[\]@!$&'()*+,;=])*/ig.test(v),
      message: 'URL должен быть валидным',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: String,
    required: [true, 'Поле обязательно для заполнения'],
  },
  nameRU: {
    type: String,
    required: [true, 'Поле обязательно для заполнения'],
  },
  nameEN: {
    type: String,
    required: [true, 'Поле обязательно для заполнения'],
  },
}, {
  versionKey: false,
});

module.exports = mongoose.model('movie', movieSchema);
