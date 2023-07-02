const router = require('express').Router();
const {
  getUsers, getUserById, updateProfile, updateAvatar, getInfoCurrentUser,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getInfoCurrentUser);
router.get('/:_id', getUserById);
router.patch('/me', updateProfile);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
