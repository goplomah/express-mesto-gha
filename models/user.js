const mongoose = require('mongoose');
// eslint-disable-next-line import/no-extraneous-dependencies
const validator = require('validator');
// eslint-disable-next-line import/no-extraneous-dependencies
const bcrypt = require('bcryptjs');
const UnauthorizationError = require('../errors/UnauthorizationError');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'поле "email" должно быть заполнено'],
      validate: {
        validator: (v) => validator.isEmail(v),
      },
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 10,
      select: false,
    },
    name: {
      type: String,
      minlength: [2, 'минимальная длина поля "name" - 2'],
      maxlength: [30, 'максимальная длина поля "name" - 30'],
      default: 'Жак-Ив Кусто',
      unique: true,
    },
    about: {
      type: String,
      minlength: [2, 'минимальная длина поля "about" - 2'],
      maxlength: [30, 'максимальная длина поля "about" - 30'],
      default: 'Исследователь',
    },
    avatar: {
      type: String,
      default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
      validate: {
        validator: (v) => validator.isURL(v),
      },
    },
  },
  { versionKey: false },
);

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizationError('Неправильные почта или пароль'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorizationError('Неправильные почта или пароль'));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
