const Card = require('../models/card');

const getCards = (req, res) => Card.find({}).then((cards) => { res.send({ data: cards }); }).catch(() => { res.status(500).send({ message: 'произошла ошибка сервера' }); });

const createCard = (req, res) => {
  const owner = req.user._id;
  const { name, link } = req.body;
  return Card.create({ name, link, owner }).then((card) => { res.status(201).send({ data: card }); }).catch(() => res.status(500).send({ message: 'произошла ошибка сервера' }));
};

const deleteCard = (req, res) => {
  const cardById = req.params._id;
  return Card.findByIdAndRemove(cardById).then((card) => { res.send({ data: card }); }).catch(() => { res.send({ message: 'Карточка не найдена или указан не корректный id' }); });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
};
