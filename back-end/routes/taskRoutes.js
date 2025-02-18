const express = require("express");
const router = express.Router();
const taskController = require("../controllers/task.controller");
const protect = require("../middleware/protect");

// Apply protect middleware to all routes
router.use(protect);

// Put specific routes before parameter routes
router.get("/stats", taskController.getTaskStats);

// Then add the routes with parameters
router.get("/", taskController.getTasks);
router.post("/", taskController.createTask);
router.put("/:id/archive", taskController.toggleArchive);
router.get("/:id", taskController.getTask);
router.put("/:id", taskController.updateTask);
router.delete("/:id", taskController.deleteTask);

module.exports = router;
