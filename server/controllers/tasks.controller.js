import { time } from "console";
import Task from "./../models/task.model.js";

export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        setTimeout(() => res.status(200).json(task), 300);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createTask = async (req, res) => {
    const task = req.body;

    const lastTask = await Task.findOne({ status: "Todo" })
        .sort({
            position: -1,
        })
        .select("position");

    const nextPosition = lastTask ? lastTask.position + 1 : 0;

    const newTask = new Task({
        ...task,
        position: nextPosition,
    });

    try {
        await newTask.save();
        res.status(201).json({ success: true, data: newTask });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateTask = async (req, res) => {
    const { id } = req.params;
    const task = req.body;

    try {
        const updatedTask = await Task.findByIdAndUpdate(id, task, {
            new: true,
        });
        res.status(200).json({ success: true, updatedTask });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateTasks = async (req, res) => {
    const tasks = req.body;

    if (!Array.isArray(tasks)) {
        return res.status(400).json({ message: "Invalid data format" });
    }

    try {
        const bulkOps = tasks.map(({ _id, position, status }) => ({
            updateOne: {
                filter: { _id },
                update: { $set: { position, status } },
            },
        }));

        const updatedTasks = await Task.bulkWrite(bulkOps);
        res.status(200).json({ success: true, updatedTasks });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteTask = async (req, res) => {
    const { id } = req.params;

    const taskToDelete = await Task.findById(id);

    if (!taskToDelete) {
        return res.status(404).json({ message: "Task not found" });
    }

    const { status, position } = taskToDelete;

    await Task.deleteOne({ _id: id });

    await Task.updateMany(
        { status, position: { $gt: position } },
        { $inc: { position: -1 } }
    );

    try {
        const deletedTask = await Task.findByIdAndDelete(id);
        res.status(200).json({ success: true, data: deletedTask });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deteleTasks = async (req, res) => {
    const ids = req.body;

    try {
        await Task.deleteMany({ _id: { $in: ids } });
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
