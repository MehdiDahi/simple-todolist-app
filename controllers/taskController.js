const Task = require("../models/taskModel");
const express = require("express");
const app = express();
app.use(express.json());

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json(tasks);
  } 
  catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const getTask = async (req, res) => {
  try {
    const {id} = req.params;
    const task = await Task.findById(id);
    res.status(200).json(task);
  } 
  catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const createTasks = async (req, res) => {
  try {
    const tasks = await Task.create(req.body);
    res.status(200).json(tasks);
  } 
  catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const updateTask = async (req, res) => {
  try {
    const {id} = req.params;
    const task = await Task.findByIdAndUpdate(id, req.body);

    if(!task){
      return escape.status(404).json({message: "Task n'existe pas"});
    }

    const updatedTask = await Task.findById(id);

    res.status(200).json(updatedTask);
  } 
  catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const deleteTask = async (req, res) => {
  try {
    const {id} = req.params;
    const task = await Task.findByIdAndDelete(id, req.body);

    if(!task){
      return escape.status(404).json({message: "Task n'existe pas"});
    }

    res.status(200).json({message: "Task suppimer"});
  } 
  catch (error) {
    res.status(500).json({ message: error.message });
  }
}


module.exports = { getTasks, createTasks, getTask, updateTask, deleteTask };
