const express = require("express");
const router = express.Router();

// Project Modal
const Project = require("../../models/Project");

// @route   GET api/projects
// @desc    Get All Projects
// @access  Public
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.json({ message: err });
  }
});

// @route   GET api/projects/:projectId
// @desc    Get a Project
// @access  Public
router.get("/:projectId", async (req, res) => {
  const projectId = req.params.projectId;

  try {
    const foundProject = await Project.findById(projectId);
    res.send(foundProject);
  } catch (err) {
    res.json({ message: err });
  }
});

// @route   POST api/projects
// @desc    Create a Project
// @access  Public
router.post("/", async (req, res) => {
  const project = new Project({
    name: req.body.name,
    members: [req.body.creatorName],
  });

  try {
    const savedProject = await project.save();
    res.json(savedProject);
  } catch (err) {
    res.json({ message: err });
  }
});

// @route   UPDATE api/projects/:projectId
// @desc    Delete a Project
// @access  Public
router.patch("/:projectId", async (req, res) => {
  const projectId = req.params.projectId;
  const updateProject = req.body; // {name:"project"}

  try {
    const updatedProject = await Project.updateOne(
      { _id: projectId },
      { $set: updateProject }
    );
    res.json(updatedProject);
  } catch (err) {
    res.json({ message: err });
  }
});

// @route   DELETE api/projects/:projectId
// @desc    Delete a Project
// @access  Public
router.delete("/:projectId", async (req, res) => {
  const projectId = req.params.projectId;

  try {
    const removedPost = await Project.remove({ _id: projectId });
    res.json(removedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
