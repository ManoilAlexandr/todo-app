import { UniqueIdentifier } from "@dnd-kit/core";
import {
    ArrowLeftRight,
    Pen,
    SquareArrowOutUpRight,
    Trash,
} from "lucide-react";
import { type FC, type PropsWithChildren } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useManipulation } from "@/hooks/useManipulation";
import { select } from "@/store/reducers/SelectoSlice";
import { removeTask, updateTask } from "@/store/reducers/TaskSlice";
import type { Layout } from "@/types";
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuSeparator,
    ContextMenuSub,
    ContextMenuSubContent,
    ContextMenuSubTrigger,
    ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { DialogTrigger } from "@/components/ui/dialog";

type TaskContextMenu = {
    layoutId: Layout;
    itemId: UniqueIdentifier;
};
export const TaskContextMenu: FC<PropsWithChildren<TaskContextMenu>> = (
    props
) => {
    const dispatch = useAppDispatch();
    const selectedIds = useAppSelector((state) => state.selecto.selectedIds);
    const { children } = props;
    const { layoutId, itemId } = props;
    const { moveTo, getAvailableContainers } = useManipulation();
    const availableContainers = getAvailableContainers(layoutId);

    const onDeleteHandler = () => {
        dispatch(removeTask(itemId));
    };

    const onUpdateHandler = () => {
        dispatch(updateTask(itemId));
    };

    const onOpenChange = () => {
        if (selectedIds.length) {
            dispatch(select([]));

            document
                .querySelectorAll("[data-slot='card']")
                .forEach((el) => el.classList.remove("bg-blue-50"));
        }
    };

    return (
        <ContextMenu onOpenChange={onOpenChange}>
            <ContextMenuTrigger>{children}</ContextMenuTrigger>
            <ContextMenuContent className={"w-56"}>
                <DialogTrigger asChild>
                    <ContextMenuItem>
                        <SquareArrowOutUpRight />
                        View Detail
                    </ContextMenuItem>
                </DialogTrigger>
                <ContextMenuItem onClick={onUpdateHandler}>
                    <Pen />
                    Edit
                </ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuSub>
                    <ContextMenuSubTrigger className={"gap-2"}>
                        <ArrowLeftRight /> Move
                    </ContextMenuSubTrigger>
                    <ContextMenuSubContent className="w-44">
                        {availableContainers.map((layout, index) => (
                            <ContextMenuItem
                                key={index}
                                onClick={() => moveTo(layoutId, layout, itemId)}
                            >
                                {layout}
                            </ContextMenuItem>
                        ))}
                    </ContextMenuSubContent>
                </ContextMenuSub>
                <ContextMenuSeparator />
                <ContextMenuItem
                    variant="destructive"
                    onClick={onDeleteHandler}
                >
                    <Trash />
                    Delete
                </ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    );
};
