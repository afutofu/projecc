const express = require("express");
const router = express.Router({ mergeParams: true });
const auth = require("../../middleware/auth");

// User Model
const User = require("../../models/User");

// @route   POST /api/users/:userId/friends
// @desc    Send Friend Request
// @access  Private
router.post("/", auth, (req, res) => {
  const userId = req.params.userId;
  const { friendId } = req.body;

  User.findById(userId, (err, foundUser) => {
    if (err) return res.status(400).json({ msg: "User must be logged in" });

    User.findById(friendId, (err, foundFriend) => {
      if (err) return res.status(400).json({ msg: "User does not exist" });

      foundUser.requests.unshift({
        type: "SENT",
        friendId,
        timeCreated: Date.now(),
      });

      foundFriend.requests.unshift({
        type: "RECEIVED",
        friendId: userId,
        timeCreated: Date.now(),
      });

      foundUser.save();
      foundFriend.save();

      res.status(200).json({ request: foundUser.requests[0] });
    });
  });

  return null;
});

module.exports = router;
