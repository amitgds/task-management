// models/task.js
const db = require('../config/database');

exports.getAllTasks = function(callback) {
    db.query('SELECT * FROM task', callback); // Ensure the database table has the required fields
};

exports.getTaskById = function(id, callback) {
    db.query('SELECT * FROM task WHERE task_id = ?', [id], callback); // Use task_id as the unique identifier
};

exports.createTask = function(newTask, callback) {
    db.query('INSERT INTO task SET ?', newTask, callback); // Insert new task with all required fields
};

exports.updateTask = function(id, updatedTask, callback) {
    db.query('UPDATE task SET ? WHERE task_id = ?', [updatedTask, id], callback); // Update task by task_id
};

exports.deleteTask = function(id, callback) {
    db.query('DELETE FROM task WHERE task_id = ?', [id], callback); // Delete task by task_id
};