import { type FC, type PropsWithChildren } from "react";
import { useManipulation } from "../../hooks/useManipulation";
import type { Layout } from "../../types";
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuSeparator,
    ContextMenuSub,
    ContextMenuSubContent,
    ContextMenuSubTrigger,
    ContextMenuTrigger,
} from "../ui/context-menu";
import { DialogTrigger } from "../ui/dialog";

type TaskContextMenu = {
    layoutId: Layout;
    itemId: number;
};
export const TaskContextMenu: FC<PropsWithChildren<TaskContextMenu>> = (
    props
) => {
    const { children } = props;
    const { layoutId, itemId } = props;

    const { moveTo, remove, getAvailableContainers } = useManipulation();

    const availableContainers = getAvailableContainers(layoutId);
    return (
        <ContextMenu>
            <ContextMenuTrigger>{children}</ContextMenuTrigger>
            <ContextMenuContent className={"w-56"}>
                <DialogTrigger asChild>
                    <ContextMenuItem>View Detail</ContextMenuItem>
                </DialogTrigger>
                <ContextMenuSeparator />
                <ContextMenuSub>
                    <ContextMenuSubTrigger>Move</ContextMenuSubTrigger>
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
                <ContextMenuItem
                    variant="destructive"
                    onClick={() => remove(itemId)}
                >
                    Delete
                </ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    );
};
