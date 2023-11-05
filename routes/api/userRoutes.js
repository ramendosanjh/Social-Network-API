const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  addNewFriend,
  removeFriend,
} = require('../../controllers/userController');


// Get all users and create a new user
router.route('/').get(getUsers).post(createUser);

// Get, update, and delete a single user
router
.route('/:userId')
.get(getSingleUser)
.put(updateUser)
.delete(deleteUser);

// Add and remove a friend
router.route('/:userId/friends').post(addNewFriend);

router.route("/:userId/friends/:friendId").delete(removeFriend);


module.exports = router;
