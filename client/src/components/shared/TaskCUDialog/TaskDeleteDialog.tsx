import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { taskAPI } from "@/services/TaskService";
import { removeTask } from "@/store/reducers/TaskSlice";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import Loader from "@/components/shared/Loader";

const TaskDeleteDialog = () => {
    const isDelete = useAppSelector((state) => state.task.isDelete);
    const [open, setOpen] = useState(false);
    const dispatch = useAppDispatch();
    const [deleteTask] = taskAPI.useDeleteTaskMutation();

    useEffect(() => {
        setOpen(!!isDelete);
    }, [isDelete]);

    const onDeleteHandler = async () => {
        try {
            if (!isDelete) return;

            const result = await deleteTask(isDelete);
            const isSuccess = result?.data?.success;

            if (isSuccess) onSuccess();
        } catch (error) {
            console.log(error);
        }
    };

    const onClose = () => dispatch(removeTask(null));

    const onSuccess = () => {
        dispatch(removeTask(null));
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <Loader />
                <DialogHeader>
                    <DialogTitle>Delete Task</DialogTitle>
                    <DialogDescription>Task will be deleted</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant={"outline"}>Cancel</Button>
                    </DialogClose>
                    <Button onClick={onDeleteHandler} variant={"destructive"}>
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default TaskDeleteDialog;
