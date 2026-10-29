
const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");

const {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask
} = require("../controllers/taskController");

const {
    createTaskValidator,
    updateTaskValidator
} = require("../validators/taskValidator");

const router = express.Router();

router.use(authMiddleware);

router.post("/", createTaskValidator, createTask);
router.get("/", getTasks);
router.get("/:id", getTaskById);
router.put("/:id", updateTaskValidator, updateTask);
router.delete("/:id", deleteTask);

module.exports = router;
