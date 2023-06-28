const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => { res.send({ data: cards }); })
    .catch(() => { res.status(500).send({ message: 'произошла ошибка сервера' }); });
};

const createCard = (req, res) => {
  const owner = req.user._id;
  const { name, link } = req.body;
  Card.create({ name, link, owner })
    .then((card) => { res.status(201).send({ data: card }); })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'переданы некорректные данные при создании карточки' });
      }
      return res.status(500).send({ message: 'произошла ошибка сервера' });
    });
};

const deleteCard = (req, res) => {
  const cardById = req.params._id;
  const userById = req.user._id;
  Card.findById(cardById)
    // eslint-disable-next-line consistent-return
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'карточка с указанным id не найдена' });
      }
      if (card.owner.toString() !== userById) {
        return res.status(403).send({ message: 'У вас нет прав на удаление чужой карточки' });
      }
      Card.findByIdAndRemove(cardById)
        .then(() => { res.status(200).send({ data: card }); })
        .catch((err) => {
          if (err.name === 'CastError') {
            return res.status(400).send({ message: 'передан несуществующий _id карточки' });
          }
          return res.status(500).send({ message: 'произошла ошибка сервера' });
        });
    });
};

const likeCard = (req, res) => {
  const cardById = req.params._id;
  const userById = req.user._id;
  Card.findByIdAndUpdate(cardById, { $addToSet: { likes: userById } }, { new: true })
    .then((card) => {
      if (card) {
        return res.send({ data: card });
      }
      return res.status(404).send({ message: 'передан несуществующий _id карточки' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'переданы некорректные данные для постановки лайка' });
      }
      return res.status(500).send({ message: 'произошла ошибка сервера' });
    });
};

const dislikeCard = (req, res) => {
  const cardById = req.params._id;
  const userById = req.user._id;
  Card.findByIdAndUpdate(cardById, { $pull: { likes: userById } }, { new: true })
    .then((card) => {
      if (card) {
        return res.send({ data: card });
      }
      return res.status(404).send({ message: 'передан несуществующий _id карточки' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'переданы некорректные данные для снятия лайка' });
      }
      return res.status(500).send({ message: 'произошла ошибка сервера' });
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
