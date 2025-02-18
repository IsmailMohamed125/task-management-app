const express = require("express");
const userRouter = require("./userRoutes");
const taskRouter = require("./taskRoutes");

const router = express.Router();

router.use("/users", userRouter);
router.use("/tasks", taskRouter);

module.exports = router;
