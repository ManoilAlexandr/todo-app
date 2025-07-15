import { TaskDialog } from "./TaskDialog";
import { TaskContextMenu } from "./TaskContextMenu";
import type { FC, PropsWithChildren } from "react";
import type { Layout, Task } from "../../types";

type FunctionalTaskProps = {
    layoutId: Layout;
    item: Task;
};
const FunctionalTask: FC<PropsWithChildren<FunctionalTaskProps>> = ({
    children,
    item,
    layoutId,
}) => {
    return (
        <TaskDialog layoutId={layoutId} item={item}>
            <TaskContextMenu layoutId={layoutId} itemId={item.id}>
                {children}
            </TaskContextMenu>
        </TaskDialog>
    );
};

export default FunctionalTask;
