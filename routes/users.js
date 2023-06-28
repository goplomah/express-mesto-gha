const router = require('express').Router();
const {
  getUsers, getUserById, updateProfile, updateAvatar, getInfoCurrentUser,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:_id', getUserById);
router.patch('/me', updateProfile);
router.patch('/me/avatar', updateAvatar);
router.get('/me', getInfoCurrentUser);

module.exports = router;
