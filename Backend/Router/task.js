const express = require("express");
const { TaskModel } = require("../Router/task");

const listRouter = express.Router();

listRouter.post("/list-create", async (req, res) => {
  console.log(req.body)
    try {
        const newTask = new TaskModel(req.body);
        await newTask.save();
        res.status(201).send("Created successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

listRouter.get("/list-get", async (req, res) => {
    try {
        const tasks = await TaskModel.find();
        res.status(200).json(tasks);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = {
    listRouter
};
