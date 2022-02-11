// add middlewares here related to projects
const Projects = require("./projects-model");

async function validateProject(req, res, next) {
  let { id } = req.params;
  let project = await Projects.get(id);
  if (!project) {
    res.status(404).json({ message: "Invalid project ID" });
    return;
  }
  req.project = project;
  next();
}

async function validatePostingProject(req, res, next) {
  let { name, description } = req.body;
  if (!name || !description) {
    res.status(400).json({ message: "must include name and description" });
    return;
  }
  next();
}

async function validateUpdatingProject(req, res, next) {
  let { name, description, completed } = req.body;
  if (!name || !description || completed === undefined) {
    res
      .status(400)
      .json({ message: "must include name, description and completed" });
    return;
  }
  next();
}

module.exports = {
  validateProject,
  validatePostingProject,
  validateUpdatingProject,
};
