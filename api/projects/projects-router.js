// Write your "projects" router here!
const express = require("express");
const Projects = require("./projects-model");
const {
  validateProject,
  validatePostingProject,
  validateUpdatingProject,
} = require("./projects-middleware");

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

router.post("/", validatePostingProject, async (req, res) => {
  try {
    let newProject = await Projects.insert(req.body);

    res.status(201).json(newProject);
  } catch (e) {
    res.status(500).json({ message: "error posting new project" });
  }
});

router.put(
  "/:id",
  validateProject,
  validateUpdatingProject,
  async (req, res) => {
    try {
      let { id } = req.params;
      let updatedProject = await Projects.update(id, req.body);
      res.status(200).json(updatedProject);
    } catch (e) {
      res.status(500).json({ message: "error editing project" });
    }
  }
);

module.exports = router;
