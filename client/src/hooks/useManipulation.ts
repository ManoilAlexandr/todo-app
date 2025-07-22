import type { UniqueIdentifier } from "@dnd-kit/core";
import { useCallback } from "react";
import { findItemContainerAndItem, reorderTasks } from "@/lib/utils.ts";
import { taskAPI } from "@/services/TaskService.ts";
import type { Layout } from "@/types.ts";

export const useManipulation = () => {
    const { data: kanban = [] } = taskAPI.useGetTasksQuery();
    const [updateTasks] = taskAPI.useUpdateTasksMutation();
    const [removeTask] = taskAPI.useDeleteTaskMutation();

    const getAvailableContainers = useCallback(
        (filterBy?: Layout) => {
            const options = kanban.map((board) => board.id);
            return filterBy
                ? options.filter((option) => option !== filterBy)
                : options;
        },
        [kanban]
    );

    const moveTo = useCallback(
        (from: Layout, to: Layout, itemId: UniqueIdentifier) => {
            const result = findItemContainerAndItem(itemId, kanban);
            if (!result) return;

            const { container, item } = result;

            if (container.id !== from) return;

            const updatedState = kanban.map((c) => {
                if (c.id === from) {
                    return {
                        ...c,
                        items: c.items.filter((i) => i._id !== itemId),
                    };
                }

                if (c.id === to) {
                    return { ...c, items: [...c.items, item] };
                }

                return c;
            });

            const updatedTasks = updatedState.flatMap((container) =>
                reorderTasks(container.id, container.items)
            );

            updateTasks(updatedTasks);
        },
        [kanban, updateTasks]
    );

    const remove = useCallback(
        (itemId: UniqueIdentifier) => {
            removeTask(itemId);
        },
        [removeTask]
    );

    return {
        getAvailableContainers,
        moveTo,
        remove,
    };
};
