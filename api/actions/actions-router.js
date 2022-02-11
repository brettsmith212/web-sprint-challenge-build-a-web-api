// Write your "actions" router here!
const express = require("express");
const Actions = require("./actions-model");
const {
  validateAction,
  validatePostingAction,
  validateUpdatingAction,
} = require("./actions-middlware");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let actions = await Actions.get();
    res.status(200).json(actions);
  } catch (e) {
    res.status(500).json({ message: "error getting actions" });
  }
});

router.get("/:id", validateAction, async (req, res) => {
  try {
    res.status(200).json(req.action);
  } catch (e) {
    res.status(500).json({ message: "error getting action" });
  }
});

router.post("/", validatePostingAction, async (req, res) => {
  try {
    let postedAction = await Actions.insert(req.body);
    res.status(200).json(postedAction);
  } catch (e) {
    res.status(500).json({ message: "error posting action" });
  }
});

router.put("/:id", validateAction, validateUpdatingAction, async (req, res) => {
  try {
    let { id } = req.params;
    let updatedAction = await Actions.update(id, req.body);
    res.status(200).json(updatedAction);
  } catch (e) {
    res.status(500).json({ message: "error updating action" });
  }
});

router.delete("/:id", validateAction, async (req, res) => {
  try {
    let { id } = req.params;
    let deletedAction = await Actions.remove(id);
    res.status(200).json(deletedAction);
  } catch (e) {
    res.status(500).json({ message: "error deleting action" });
  }
});

module.exports = router;
