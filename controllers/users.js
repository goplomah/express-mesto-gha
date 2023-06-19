const User = require('../models/user');

const getUsers = (req, res) => User.find({}).then((users) => res.send({ data: users })).catch(() => res.status(500).send({ message: 'произошла ошибка сервера' }));

const getUserById = (req, res) => User.findById(req.params._id).then((users) => res.status(200).send({ data: users })).catch(() => res.status(500).send({ message: 'пользователь не найде в БД' }));

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  return User.create({ name, about, avatar }).then((users) => { res.status(201).send({ data: users }); }).catch(() => res.status(500).send({ message: 'произошла ошибка сервера' }));
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
