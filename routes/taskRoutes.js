// routes/taskRoutes.js
const express = require("express");
const router = express.Router();
const TaskController = require("../controllers/taskController.js");

router.get('/', TaskController.getTasks);
router.get('/:id', TaskController.getTask);
router.post('/', TaskController.createTasks);
router.put('/:id', TaskController.updateTask);
router.delete('/:id', TaskController.deleteTask);

module.exports = router ;
