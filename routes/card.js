const router = require('express').Router();
// eslint-disable-next-line import/no-extraneous-dependencies
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/card');
const {
  createCardValidation, deleteCardValidation, likeCardValidation, dislikeCardValidation,
} = require('../middlewares/validationRoutes');

router.get('/', getCards);
router.post('/', createCardValidation, createCard);
router.delete('/:_id', deleteCardValidation, deleteCard);
router.put('/:_id/likes', likeCardValidation, likeCard);
router.delete('/:_id/likes', dislikeCardValidation, dislikeCard);

module.exports = router;
