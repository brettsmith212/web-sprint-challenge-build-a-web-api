// add middlewares here related to actions
const Actions = require("./actions-model");

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

module.exports = {
  validateAction,
};
