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
        return res.status(200).send({ data: user });
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
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => { res.status(201).send({ data: user }); })
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
  return User.findByIdAndUpdate(userById, { name, about }).then((user) => { res.send({ data: user }); }).catch(() => { res.status(500).send({ message: 'произошла ошибка обновдения аватара' }); });
};

const updateAvatar = (req, res) => {
  const userById = req.user._id;
  const { avatar } = req.body;
  return User.findByIdAndUpdate(userById, { avatar }).then((user) => { res.send({ data: user }); }).catch(() => { res.status(500).send({ message: 'ошибка обновления аватара пользователя' }); });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar,
};
