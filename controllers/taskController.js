// controllers/taskController.js
const Task = require('../models/task');
const Joi = require('joi');

exports.getAllTasks = function (req, res) {
    Task.getAllTasks((err, tasks) => {
        if (err) {
            res.status(400).json({
                status: 400,
                success: false,
                message: "Unable to fetch tasks.",
            });
        }
        res.status(200).json({
            status: 200,
            success: true,
            message: "Tasks fetched successfully.",
            data: tasks,
        });
    });
};

exports.getTaskById = function (req, res) {
    // Validate task_id
    const taskId = req.params.id;
    if (!taskId) {
        return res.status(400).json({
            status: 400,
            success: false,
            error: "task_id is required"
        });
    }
    Task.getTaskById(req.params.id, (err, task) => {
        if (err) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Unable to fetch task.",
            });
        }
        return res.status(200).json({
            status: 200,
            success: true,
            message: "Task fetched successfully.",
            data: task,
        });
    });
};

exports.createTask = function (req, res) {
    const { title, description, due_date, status } = req.body;

    // Validate required fields with joi
    const schema = Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        due_date: Joi.date().required(),
        status: Joi.string().valid('pending', 'in-progress', 'completed').required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({
            status: 400,
            success: false, message: error.details[0].message
        });
    }

    // Validate status
    const validStatuses = ["pending", "in-progress", "completed"];
    if (!validStatuses.includes(status)) {
        return res.status(400).json({
            status: 400,
            success: false, message: "Invalid status value"
        });
    }

    const created_at = new Date();
    const updated_at = new Date();
    const newTask = {
        title,
        description,
        due_date,
        status,
        created_at,
        updated_at
    };

    if (!newTask.title || !newTask.description || !newTask.due_date || !newTask.status) {
        return res.status(400).json({
            status: 400,
            success: false, message: "All fields are required"
        });
    }



    Task.createTask(newTask, (err, result) => {
        if (err) {
            res.status(400).json({
                status: 400,
                success: false,
                message: "Unable to create task.",
            });
        }
        res.status(200).json({
            status: 200,
            success: true,
            message: "Task created successfully.",

        });
    });
};

exports.updateTask = function (req, res) {
    const { title, description, due_date, status } = req.body;

    // Validate required fields with joi
    const schema = Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        due_date: Joi.date().required(),
        status: Joi.string().valid('pending', 'in-progress', 'completed').required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({
            status: 400,
            success: false, message: error.details[0].message
        });
    }

    // validate id
    if (!req.params.id) {
        return res.status(400).json({
            status: 400,
            success: false,
            message: "task_id is required",
        });
    }


    const updated_at = new Date();
    const updatedTask = {
        title,
        description,
        due_date,
        status,
        updated_at
    };

    Task.updateTask(req.params.id, updatedTask, (err, result) => {
        if (err) {
            res.status(400).json({
                status: 400,
                success: false,
                message: "Unable to update task.",
            });
        }
        res.status(200).json({
            status: 200,
            success: true,
            message: "Task updated successfully.",

        });
    });
};

exports.deleteTask = function (req, res) {
    Task.deleteTask(req.params.id, (err, result) => {
        if (err) {
            res.status(400).json({
                status: 400,
                success: false,
                message: "Unable to delete task.",
            });
        }
        res.status(200).json({
            status: 200,
            success: true,
            message: "Task deleted successfully.",
        });
    });
};