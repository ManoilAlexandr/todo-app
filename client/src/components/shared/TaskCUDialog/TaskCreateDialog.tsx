import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import TaskForm from "./TaskForm";
import { taskAPI } from "@/services/TaskService";
import { Layout, Task } from "@/types";
import Loader from "../Loader";

const TaskCreateDialog = () => {
    const [open, setOpen] = useState(false);
    const [createTask] = taskAPI.useAddTaskMutation();

    const onSubmit = async (data: Task) => {
        try {
            const task = {
                ...data,
                status: Layout.Todo,
            };
            const result = await createTask(task);
            const isSuccess = result?.data?.success;

            if (isSuccess) setOpen(false);

            return isSuccess;
        } catch (error) {
            console.log(error);

            return false;
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Create Task</Button>
            </DialogTrigger>
            <DialogContent forceMount>
                <Loader />
                <DialogHeader>
                    <DialogTitle>Create a New Task</DialogTitle>
                    <DialogDescription>
                        Task will be created in To Do column
                    </DialogDescription>
                </DialogHeader>
                <TaskForm onSubmit={onSubmit} />
            </DialogContent>
        </Dialog>
    );
};

export default TaskCreateDialog;
