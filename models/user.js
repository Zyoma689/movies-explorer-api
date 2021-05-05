const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Поле Email обязательно для заполнения'],
    unique: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: 'Email должен быть валидным',
    },
  },
  password: {
    type: String,
    required: [true, 'Поле Пароль обязательно для заполнения'],
    select: false,
  },
  name: {
    type: String,
    required: [true, 'Поле Имя обязательно для заполнения'],
    minlength: [2, 'Имя не может быть короче 2-х символов'],
    maxlength: [30, 'Имя не может быть длинее 30-ти символов'],
  },
}, {
  versionKey: false,
});

module.exports = mongoose.model('user', userSchema);
