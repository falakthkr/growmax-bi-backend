const express = require("express");
const router = express.Router();
const {
  getTasks,
  addTask,
  deleteTask,
  updateTask,
} = require("../controllers/todoController");

router.get("/", getTasks);
router.post("/", addTask);
router.delete("/:id", deleteTask);
router.patch("/:id", updateTask);

module.exports = router;
