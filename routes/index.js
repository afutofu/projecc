const express = require("express");
const router = express.Router();

router.get("/", (_req, res) => {
  res.send("Server is running");
});

module.exports = router;
