const Card = require('../models/card');
const ValidationError = require('../errors/ValidationError');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => { res.send({ data: cards }); })
    .catch(next);
};

const createCard = (req, res, next) => {
  const owner = req.user._id;
  const { name, link } = req.body;
  Card.create({ name, link, owner })
    .then((card) => { res.status(201).send({ data: card }); })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new ValidationError('переданы некорректные данные при создании карточки'));
      }
      return next(err);
    });
};

const deleteCard = (req, res, next) => {
  const cardById = req.params._id;
  const userById = req.user._id;
  Card.findById(cardById)
    // eslint-disable-next-line consistent-return
    .then((card) => {
      if (!card) {
        return next(new NotFoundError('карточка с указанным id не найдена'));
      }
      if (card.owner.toString() !== userById) {
        return next(new ForbiddenError('У вас нет прав на удаление чужой карточки'));
      }
      return Card.findByIdAndRemove(cardById)
        .then(() => res.status(200).send({ data: card }))
        .catch((err) => {
          if (err.name === 'CastError') {
            return next(new ValidationError('передан несуществующий _id карточки'));
          }
          return next(err);
        });
    });
};

const likeCard = (req, res, next) => {
  const cardById = req.params._id;
  const userById = req.user._id;
  Card.findByIdAndUpdate(cardById, { $addToSet: { likes: userById } }, { new: true })
    .then((card) => {
      if (card) {
        return res.status(201).send({ data: card });
      }
      return next(new NotFoundError('передан несуществующий _id карточки'));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new ValidationError('переданы некорректные данные для постановки лайка'));
      }
      return next(err);
    });
};

const dislikeCard = (req, res, next) => {
  const cardById = req.params._id;
  const userById = req.user._id;
  Card.findByIdAndUpdate(cardById, { $pull: { likes: userById } }, { new: true })
    .then((card) => {
      if (card) {
        return res.send({ data: card });
      }
      return next(new NotFoundError('передан несуществующий _id карточки'));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new ValidationError('переданы некорректные данные для снятия лайка'));
      }
      return next(err);
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
