// eslint-disable-next-line import/no-extraneous-dependencies
const bcrypt = require('bcryptjs');
// eslint-disable-next-line import/no-extraneous-dependencies
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.send({ data: users });
    })
    .catch(() => {
      res.status(500).send({ message: 'произошла ошибка сервера' });
    });
};

const getUserById = (req, res) => {
  User.findById(req.params._id)
    .then((user) => {
      if (user) {
        return res.send({ data: user });
      }
      return res.status(404).send({ message: 'пользователь по указанному id не найден' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'переданны некорректные данные id при запросе пользователя' });
      }
      return res.status(500).send({ message: 'произошла ошибка сервера' });
    });
};

const createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        name, about, avatar, email, password: hash,
      });
    })
    .then((user) => {
      res.status(201).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'переданы некорректные данные при создании пользователя' });
      }
      return res.status(500).send({ message: 'произошла ошибка сервера' });
    });
};

const updateProfile = (req, res) => {
  const userById = req.user._id;
  const { name, about } = req.body;
  User.findByIdAndUpdate(userById, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'переданны некорректные данные пользователя при обновлении профиля' });
      }
      return res.status(500).send({ message: 'произошла ошибка сервера' });
    });
};

const updateAvatar = (req, res) => {
  const userById = req.user._id;
  const { avatar } = req.body;
  User.findByIdAndUpdate(userById, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'переданы некорректные данные при обновлении аватара' });
      }
      return res.status(500).send({ message: 'произошла ошибка сервера' });
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};

const getInfoCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    // eslint-disable-next-line consistent-return
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'пользователь не найден' });
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
