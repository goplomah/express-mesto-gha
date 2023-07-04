const mongoose = require('mongoose');
// eslint-disable-next-line import/no-extraneous-dependencies
const validator = require('validator');

const cardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: [2, 'минимальная длина поля "name" - 2'],
      maxlength: [30, 'максимальная длина поля "name" - 30'],
      required: true,
    },
    link: {
      type: String,
      required: true,
      validate: {
        validator: (v) => validator.isURL(v),
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'user',
    },
    likes: {
      type: [mongoose.Schema.Types.ObjectId],
      default: [],
      ref: 'user',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('card', cardSchema);
