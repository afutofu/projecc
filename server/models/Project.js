const mongoose = require("mongoose");

const ProjectSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  members: {
    type: Array,
    default: [],
  },
  channels: {
    type: Object,
    default: { general: [] },
  },
});

module.exports = mongoose.model("Projects", ProjectSchema);
