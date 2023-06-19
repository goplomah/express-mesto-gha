const User = require('../models/user');

const getUsers = (req, res) => User.find({}).then((users) => res.send({ data: users })).catch(() => res.status(500).send({ message: 'произошла ошибка сервера' }));

const getUserById = (req, res) => User.findById(req.params._id).then((users) => res.status(200).send({ data: users })).catch(() => res.status(500).send({ message: 'пользователь не найде в БД' }));

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  return User.create({ name, about, avatar }).then((users) => { res.status(201).send({ data: users }); }).catch(() => res.status(500).send({ message: 'произошла ошибка сервера' }));
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
};
