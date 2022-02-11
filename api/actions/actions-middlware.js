// add middlewares here related to actions
const Actions = require("./actions-model");
const Projects = require("../projects/projects-model");

async function validateAction(req, res, next) {
  let { id } = req.params;
  let action = await Actions.get(id);
  if (!action) {
    res.status(404).json({ message: "Invalid action ID" });
    return;
  }
  req.action = action;
  next();
}

async function validatePostingAction(req, res, next) {
  let { notes, description, project_id } = req.body;
  if (!notes || !description || !project_id) {
    res
      .status(400)
      .json({ message: "must include notes, description and project_id" });
    return;
  }
  let project = await Projects.get(project_id);
  if (!project) {
    res.status(404).json({ message: "invalid project_id" });
    return;
  }
  next();
}

async function validateUpdatingAction(req, res, next) {
  let { notes, description, completed, project_id } = req.body;
  if (!notes || !description || completed === undefined || !project_id) {
    res.status(400).json({
      message: "must include notes, description, completed and project_id",
    });
    return;
  }
  next();
}

module.exports = {
  validateAction,
  validatePostingAction,
  validateUpdatingAction,
};
