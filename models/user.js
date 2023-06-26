const mongoose = require('mongoose');
// eslint-disable-next-line import/no-extraneous-dependencies
const validator = require('validator');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'поле "email" должно быть заполнено'],
      unique: true,
      validate: {
        validator: (v) => validator.isEmail(v),
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 10,
    },
    name: {
      type: String,
      minlength: [2, 'минимальная длина поля "name" - 2'],
      maxlength: [30, 'максимальная длина поля "name" - 30'],
      required: [true, 'поле "name" должно быть заполнено'],
    },
    about: {
      type: String,
      minlength: [2, 'минимальная длина поля "about" - 2'],
      maxlength: [30, 'максимальная длина поля "about" - 30'],
      required: [true, 'поле "about" должно быть заполнено'],
    },
    avatar: {
      type: String,
      required: [true, 'поле "avatar" должно быть заполнено'],
      validate: {
        validator: (v) => validator.isURL(v),
      },
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('user', userSchema);
