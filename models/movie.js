const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, 'Поле "Страна" обязательно для заполнения'],
  },
  director: {
    type: String,
    required: [true, 'Поле "Режисер" обязательно для заполнения'],
  },
  duration: {
    type: Number,
    required: [true, 'Поле "Продолжительность" обязательно для заполнения'],
  },
  year: {
    type: String,
    required: [true, 'Поле "Год" обязательно для заполнения'],
  },
  description: {
    type: String,
    required: [true, 'Поле "Описание" обязательно для заполнения'],
  },
  image: {
    type: String,
    required: [true, 'Поле "URL-адресс постера" обязательно для заполнения'],
    validate: {
      validator: (v) => /https?:\/\/(www\.)?([-\w.:])+([-\w._~:/?#[\]@!$&'()*+,;=])*/ig.test(v),
      message: 'URL-адресс постера должен быть валидным',
    },
  },
  trailer: {
    type: String,
    required: [true, 'Поле "URL-адресс трейлера" обязательно для заполнения'],
    validate: {
      validator: (v) => /https?:\/\/(www\.)?([-\w.:])+([-\w._~:/?#[\]@!$&'()*+,;=])*/ig.test(v),
      message: 'URL-адресс трейлера должен быть валидным',
    },
  },
  thumbnail: {
    type: String,
    required: [true, 'Поле "URL-адресс превью постера" обязательно для заполнения'],
    validate: {
      validator: (v) => /https?:\/\/(www\.)?([-\w.:])+([-\w._~:/?#[\]@!$&'()*+,;=])*/ig.test(v),
      message: 'URL-адресс превью постера должен быть валидным',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: String,
    required: [true, 'Поле "id фильма" обязательно для заполнения'],
  },
  nameRU: {
    type: String,
    required: [true, 'Поле "Название фильма на русском языке" обязательно для заполнения'],
  },
  nameEN: {
    type: String,
    required: [true, 'Поле "Название фильма на английском языке" обязательно для заполнения'],
  },
}, {
  versionKey: false,
});

module.exports = mongoose.model('movie', movieSchema);
