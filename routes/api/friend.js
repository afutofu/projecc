const express = require("express");
const router = express.Router({ mergeParams: true });
const auth = require("../../middleware/auth");

// User Model
const User = require("../../models/User");

// @route   POST /api/users/:userId/friends/:friendId/requests
// @desc    Send Friend Request
// @access  Private
router.post("/:friendId/requests", auth, (req, res) => {
  const { userId, friendId } = req.params;

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

// @route   DELETE /api/users/:userId/friends/:friendId/requests
// @desc    Delete Friend Request
// @access  Private
router.delete("/:friendId/requests", auth, (req, res) => {
  const { userId, friendId } = req.params;

  User.findById(userId, (err, foundUser) => {
    if (err) return res.status(400).json({ msg: "User must be logged in" });

    User.findById(friendId, (err, foundFriend) => {
      if (err) return res.status(400).json({ msg: "User does not exist" });

      // Remove request from both users
      foundUser.requests = foundUser.requests.filter((request) => {
        if (request.friendId !== friendId) return request;
      });

      foundFriend.requests = foundFriend.requests.filter((request) => {
        if (request.friendId !== userId) return request;
      });

      foundUser.save();
      foundFriend.save();

      res.status(200).json({ deletedId: friendId });
    });
  });

  return null;
});

module.exports = router;
