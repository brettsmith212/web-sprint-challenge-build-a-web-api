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

module.exports = {
  validateProject,
};
