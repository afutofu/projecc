const express = require("express");
const router = express.Router({ mergeParams: true });
const auth = require("../../middleware/auth");

const DirectMessage = require("../../models/DirectMessage");

// @route   GET /api/users/:userId/directMessages
// @desc    Get all direct messages for user
// @access  Private
router.get("/", auth, (req, res) => {
  const { userId } = req.params;

  DirectMessage.find({ members: userId }, (err, directMessages) => {
    if (err)
      return res
        .status(400)
        .json({ msg: "No direct messages found for this user" });

    res.status(200).json({ directMessages });
  });
});

// @route   POST /api/users/:userId/directMessages
// @desc    Create direct message for user
// @access  Private
router.post("/", auth, (req, res) => {
  const { userId } = req.params;
  const { friendId } = req.body;

  const members = [userId, friendId];

  const newDirectMessage = new DirectMessage({
    members,
    messages: [],
    lastMessageTime: null,
  });

  newDirectMessage.save((err, directMessage) => {
    if (err) return res.status(500).json({ msg: "Internal server error" });

    res.status(200).json({ directMessage });
  });
});

module.exports = router;
