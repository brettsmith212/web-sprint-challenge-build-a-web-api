// Write your "actions" router here!
const express = require("express");
const Actions = require("./actions-model");
const { validateAction } = require("./actions-middlware");

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

module.exports = router;
