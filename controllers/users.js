// eslint-disable-next-line import/no-extraneous-dependencies
const bcrypt = require('bcryptjs');
// eslint-disable-next-line import/no-extraneous-dependencies
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');
const DuplicateError = require('../errors/DuplicateError');

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.send({ data: users });
    })
    .catch(next);
};

const getUserById = (req, res, next) => {
  User.findById(req.params._id)
    .then((user) => {
      if (user) {
        return res.send({ data: user });
      }
      throw new NotFoundError('пользоватедб с указанным _id не найден');
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new ValidationError('переданны некорректные данные id при запросе пользователя'));
      }
      return next(err);
    });
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        name, about, avatar, email, password: hash,
      });
    })
    .then((user) => res.status(201).send({
      data: user,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new ValidationError('переданы некорректные данные при создании пользователя'));
      }
      if (err.code === 11000) {
        return next(new DuplicateError('gользователь с такой почтой уже существует'));
      }
      return next(err);
    });
};

const updateProfile = (req, res, next) => {
  const userById = req.user._id;
  const { name, about } = req.body;
  User.findByIdAndUpdate(userById, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new ValidationError('переданны некорректные данные пользователя при обновлении профиля'));
      }
      return next(err);
    });
};

const updateAvatar = (req, res, next) => {
  const userById = req.user._id;
  const { avatar } = req.body;
  User.findByIdAndUpdate(userById, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new ValidationError('переданы некорректные данные при обновлении аватара'));
      }
      return next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(next);
};

const getInfoCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    // eslint-disable-next-line consistent-return
    .then((user) => {
      if (!user) {
        return next(new ValidationError('пользователь не найден'));
      }
      res.send({ data: user });
    })
    .catch(next);
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar,
  login,
  getInfoCurrentUser,
};
