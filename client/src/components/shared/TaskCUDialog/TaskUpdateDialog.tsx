import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { taskAPI } from "@/services/TaskService";
import { updateTask as update } from "@/store/reducers/TaskSlice";
import type { Task } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import Loader from "../Loader";
import TaskForm from "./TaskForm";

const TaskUpdateDialog = () => {
    const isUpdate = useAppSelector((state) => state.task.isUpdate);
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState(false);
    const [updateTask] = taskAPI.useUpdateTaskMutation();
    const { data: task, isFetching } = taskAPI.useGetTaskQuery(isUpdate ?? "", {
        skip: !isUpdate,
        refetchOnMountOrArgChange: true,
    });

    useEffect(() => {
        setOpen(!!isUpdate);
    }, [isUpdate]);

    const onSubmit = async (data: Task) => {
        try {
            const result = await updateTask(data);
            const isSuccess = result?.data?.success;

            if (isSuccess) onSuccess();

            return isSuccess;
        } catch (error) {
            console.log(error);

            return false;
        }
    };

    const onSuccess = () => {
        dispatch(update(null));
    };

    const onClose = () => {
        dispatch(update(null));
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <Loader />
                <DialogHeader>
                    <DialogTitle>Edit Task</DialogTitle>
                    <DialogDescription>Task will be updated</DialogDescription>
                </DialogHeader>
                {isFetching && (
                    <>
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-[100px]" />
                            <Skeleton className="h-8 w-full" />
                        </div>
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-[100px]" />
                            <Skeleton className="h-8 w-full" />
                        </div>
                    </>
                )}
                {!isFetching && (
                    <TaskForm
                        onSubmit={onSubmit}
                        task={task as unknown as Task}
                    />
                )}
            </DialogContent>
        </Dialog>
    );
};

export default TaskUpdateDialog;
