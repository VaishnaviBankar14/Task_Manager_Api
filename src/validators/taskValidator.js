
const { body } = require("express-validator");

const createTaskValidator = [
    body("title")
        .isString()
        .withMessage("Title must be a string")
        .bail()
        .trim()
        .notEmpty()
        .withMessage("Title is required")
        .bail()
        .isLength({ max: 100 })
        .withMessage("Title cannot exceed 100 characters"),

    body("description")
        .optional()
        .isString()
        .withMessage("Description must be a string")
        .bail()
        .trim()
        .isLength({ max: 500 })
        .withMessage("Description cannot exceed 500 characters"),

    body("status")
        .optional()
        .isIn(["pending", "in-progress", "completed"])
        .withMessage("Status must be pending, in-progress, or completed"),

    body("dueDate")
        .optional({ values: "null" })
        .isISO8601()
        .withMessage("Due date must be a valid ISO 8601 date")
        .bail()
        .toDate()
];

const updateTaskValidator = [
    body("title")
        .optional()
        .isString()
        .withMessage("Title must be a string")
        .bail()
        .trim()
        .notEmpty()
        .withMessage("Title cannot be empty")
        .bail()
        .isLength({ max: 100 })
        .withMessage("Title cannot exceed 100 characters"),

    body("description")
        .optional()
        .isString()
        .withMessage("Description must be a string")
        .bail()
        .trim()
        .isLength({ max: 500 })
        .withMessage("Description cannot exceed 500 characters"),

    body("status")
        .optional()
        .isIn(["pending", "in-progress", "completed"])
        .withMessage("Invalid task status"),

    body("dueDate")
        .optional({ values: "null" })
        .isISO8601()
        .withMessage("Due date must be a valid ISO 8601 date")
        .bail()
        .toDate()
];

module.exports = {
    createTaskValidator,
    updateTaskValidator,
};

