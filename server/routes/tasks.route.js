import express from "express";
import {
    getTasks,
    getTask,
    createTask,
    updateTask,
    updateTasks,
    deleteTask,
    deteleTasks,
} from "../controllers/tasks.controller.js";

const router = express.Router();

router.get("/", getTasks);

router.get("/:id", getTask);

router.post("/", createTask);

router.put("/reorder", updateTasks); // Порядок маршрутов имеет значение

router.put("/:id", updateTask);

router.delete("/delete", deteleTasks);

router.delete("/:id", deleteTask);

export default router;
