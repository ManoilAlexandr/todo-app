import TaskDeleteDialog from "./TaskDeleteDialog";
import TaskUpdateDialog from "./TaskUpdateDialog";

const TaskCRUDDialog = () => {
    return (
        <>
            <TaskUpdateDialog />
            <TaskDeleteDialog />
        </>
    );
};

export default TaskCRUDDialog;
