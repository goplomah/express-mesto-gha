/* eslint-disable consistent-return */
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

const deleteCard = ((req, res, next) => {
  const userId = req.user._id;
  const removeCard = () => {
    Card.findByIdAndRemove(req.params._id)
      .then((cardData) => {
        res.send({ data: cardData });
      })
      .catch(next);
  };
  Card.findById(req.params._id)
    .then((cardData) => {
      if (!cardData) {
        throw new NotFoundError('Приехали! Пользователь не найден!');
      }
      if (cardData.owner.toString() !== userId) {
        throw new ForbiddenError('Приехали! Не имеете права удалять чужую карточку!');
      }
      return removeCard();
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Приехали! Некорректное айди!'));
      } else next(err);
    });
});
// (req, res, next) => {
//   const cardById = req.params._id;
//   const userById = req.user._id;
//   Card.findById(cardById)
//     .then((card) => {
//       if (!card) {
//         return next(new NotFoundError('карточка с указанным id не найдена'));
//       }
//       if (card.owner.toString() !== userById) {
//         return next(new ForbiddenError('У вас нет прав на удаление чужой карточки'));
//       }
//       Card.findByIdAndRemove(cardById)
//         .then((cardData) => res.status(200).send({ data: cardData }))
//         .catch((err) => {
//           if (err.name === 'CastError') {
//             return next(new ValidationError('передан несуществующий _id карточки'));
//           }
//           return next(err);
//         });
//     })
//     .catch(next);
// };

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
