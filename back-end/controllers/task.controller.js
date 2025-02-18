const Task = require("../models/Task");

// Get all tasks for a user
exports.getTasks = async (req, res) => {
  try {
    const filters = { userId: req.user._id };

    // Add query filters
    if (req.query.status) filters.status = req.query.status;
    if (req.query.priority) filters.priority = req.query.priority;
    if (req.query.isArchived)
      filters.isArchived = req.query.isArchived === "true";

    // Handle search by title/description
    if (req.query.search) {
      filters.$or = [
        { title: { $regex: req.query.search, $options: "i" } },
        { description: { $regex: req.query.search, $options: "i" } },
      ];
    }

    const tasks = await Task.find(filters).sort({ createdAt: -1 });

    res.status(200).json({
      status: "success",
      results: tasks.length,
      data: {
        tasks,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

// Get a single task
exports.getTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!task) {
      return res.status(404).json({
        status: "fail",
        message: "Task not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        task,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

// Create a new task
exports.createTask = async (req, res) => {
  try {
    const newTask = await Task.create({
      ...req.body,
      userId: req.user._id,
    });

    res.status(201).json({
      status: "success",
      data: {
        task: newTask,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user._id,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!task) {
      return res.status(404).json({
        status: "fail",
        message: "Task not found",
      });
    }

    // If status is changed to completed, set completedAt
    if (req.body.status === "Completed" && task.status === "Completed") {
      task.completedAt = Date.now();
      await task.save();
    }

    res.status(200).json({
      status: "success",
      data: {
        task,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!task) {
      return res.status(404).json({
        status: "fail",
        message: "Task not found",
      });
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

// Archive/Unarchive a task
exports.toggleArchive = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!task) {
      return res.status(404).json({
        status: "fail",
        message: "Task not found",
      });
    }

    // Toggle the isArchived status
    task.isArchived = !task.isArchived;

    if (task.isArchived) {
      task.previousStatus = task.status;
      task.status = "Archived";
    } else {
      task.status = task.previousStatus || "To Do";
      task.previousStatus = null;
    }

    await task.save();

    res.status(200).json({
      status: "success",
      data: {
        task,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

// Get task statistics
exports.getTaskStats = async (req, res) => {
  try {
    const stats = await Task.aggregate([
      {
        $match: { userId: req.user._id },
      },
      {
        $group: {
          _id: null,
          totalTasks: { $sum: 1 },
          completedTasks: {
            $sum: {
              $cond: [
                {
                  $and: [
                    { $eq: ["$status", "Completed"] },
                    { $eq: ["$isArchived", false] },
                  ],
                },
                1,
                0,
              ],
            },
          },
          highPriorityTasks: {
            $sum: {
              $cond: [
                {
                  $and: [
                    { $eq: ["$priority", "High"] },
                    { $eq: ["$isArchived", false] },
                  ],
                },
                1,
                0,
              ],
            },
          },
          archivedTasks: {
            $sum: { $cond: ["$isArchived", 1, 0] },
          },
          inProgressTasks: {
            $sum: {
              $cond: [
                {
                  $and: [
                    { $eq: ["$status", "In Progress"] },
                    { $eq: ["$isArchived", false] },
                  ],
                },
                1,
                0,
              ],
            },
          },
          todoTasks: {
            $sum: {
              $cond: [
                {
                  $and: [
                    { $eq: ["$status", "To Do"] },
                    { $eq: ["$isArchived", false] },
                  ],
                },
                1,
                0,
              ],
            },
          },
        },
      },
    ]);

    const defaultStats = {
      totalTasks: 0,
      completedTasks: 0,
      highPriorityTasks: 0,
      archivedTasks: 0,
      inProgressTasks: 0,
      todoTasks: 0,
    };

    res.status(200).json({
      status: "success",
      data: {
        stats: stats[0] || defaultStats,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};
