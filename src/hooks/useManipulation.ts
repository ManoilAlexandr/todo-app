import type { UniqueIdentifier } from "@dnd-kit/core";
import { useCallback } from "react";
import type { Layout } from "../types.ts";
import { useKanban } from "../context/kanbanContext.ts/index.tsx";
import { findItemContainerAndItem } from "../lib/utils.ts";

export const useManipulation = () => {
    const { kanban, update } = useKanban();

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

            update((board) =>
                board.map((c) => {
                    if (c.id === from) {
                        return {
                            ...c,
                            items: c.items.filter((i) => i.id !== itemId),
                        };
                    }
                    if (c.id === to) {
                        return {
                            ...c,
                            items: [...c.items, item],
                        };
                    }

                    return c;
                })
            );
        },
        [kanban, update]
    );

    const remove = useCallback(
        (itemId: UniqueIdentifier) => {
            const result = findItemContainerAndItem(itemId, kanban);

            if (!result) return;

            const { container } = result;

            update((board) =>
                board.map((c) => {
                    if (c.id === container.id) {
                        return {
                            ...c,
                            items: c.items.filter((i) => i.id !== itemId),
                        };
                    }
                    return c;
                })
            );
        },
        [kanban, update]
    );

    return {
        getAvailableContainers,
        moveTo,
        remove,
    };
};
