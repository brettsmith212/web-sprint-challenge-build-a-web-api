// Write your "projects" router here!
const express = require("express");
const Projects = require("./projects-model");
const { validateProject } = require("./projects-middleware");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let projects = await Projects.get();
    res.status(200).json(projects);
  } catch (e) {
    res.status(500).json({ message: "error getting projects" });
  }
});

router.get("/:id", validateProject, async (req, res) => {
  try {
    res.status(200).json(req.project);
  } catch (e) {
    res.status(500).json({ message: "error getting project" });
  }
});

module.exports = router;
