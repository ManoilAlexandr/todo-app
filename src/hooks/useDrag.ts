import type {
    DragEndEvent,
    DragOverEvent,
    DragStartEvent,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useCallback, useMemo, useState } from "react";
import { useKanban } from "../context/kanbanContext.ts/index.tsx";
import {
    findContainerId,
    findEntityActiveItem,
    removeItem,
} from "../lib/utils.ts";

export const useDrag = () => {
    const { kanban, update } = useKanban();
    const [activeItemId, setActiveItemId] = useState<number | null>(null);

    const onDragStart = useCallback((event: DragStartEvent) => {
        const { active } = event;
        if (!active.id) return;

        setActiveItemId(+active.id);
    }, []);

    const onDragEnd = useCallback(
        (event: DragEndEvent) => {
            const { active, over } = event;

            if (!over) {
                setActiveItemId(null);
                return;
            }

            const activeId = active.id;
            const overId = over.id;

            const activeContainerId = findContainerId(kanban, activeId);
            const overContainerId = findContainerId(kanban, overId);

            if (!activeContainerId || !overContainerId) {
                setActiveItemId(null);
                return;
            }

            const isTheSameContainer = activeContainerId === overContainerId;
            const isNotTheSameItem = activeId !== overId;

            if (isTheSameContainer && isNotTheSameItem) {
                const containerIndex = kanban.findIndex(
                    (container) => container.id === activeContainerId
                );

                if (containerIndex === -1) {
                    setActiveItemId(null);
                    return;
                }

                const container = kanban[containerIndex];

                const activeIndex = container.items.findIndex(
                    (item) => item.id === activeId
                );
                const overIndex = container.items.findIndex(
                    (item) => item.id === overId
                );

                if (activeIndex !== -1 && overIndex !== -1) {
                    const newItems = arrayMove(
                        container.items,
                        activeIndex,
                        overIndex
                    );

                    update((container) => {
                        return container.map((c, i) => {
                            if (i === containerIndex) {
                                return { ...c, items: newItems };
                            }

                            return c;
                        });
                    });
                }
            }

            setActiveItemId(null);
        },
        [kanban, update]
    );

    const onDragCancel = useCallback(() => {
        setActiveItemId(null);
    }, []);

    const onDragOver = useCallback(
        (event: DragOverEvent) => {
            const { active, over } = event;

            if (!over) return;

            const activeId = active.id;
            const overId = over.id;

            const activeContainerId = findContainerId(kanban, activeId);
            const overContainerId = findContainerId(kanban, overId);

            if (!activeContainerId || !overContainerId) return;

            const isTheSameContainer = activeContainerId === overContainerId;
            const isNotTheSameItem = activeId !== overId;

            if (isTheSameContainer && isNotTheSameItem) return;

            if (isTheSameContainer) return;

            update((kanban) => {
                const activeContainer = kanban.find(
                    (container) => container.id === activeContainerId
                );
                if (!activeContainer) return kanban;

                const activeItem = activeContainer.items.find(
                    (item) => item.id === +activeId
                );

                if (!activeItem) return kanban;

                const newContainer = kanban.map((container) => {
                    const isActiveContainer =
                        container.id === activeContainerId;

                    if (isActiveContainer) {
                        return {
                            ...container,
                            items: removeItem(container.items, activeId),
                        };
                    }

                    const isOverContainerInKanban =
                        container.id === overContainerId;

                    if (isOverContainerInKanban) {
                        const isOverContainer = overId === overContainerId;

                        if (isOverContainer) {
                            return {
                                ...container,
                                items: [...container.items, activeItem],
                            };
                        }

                        const overItemIndex = container.items.findIndex(
                            (item) => item.id === overId
                        );

                        if (overItemIndex !== -1) {
                            return {
                                ...container,
                                items: [
                                    ...container.items.slice(
                                        0,
                                        overItemIndex + 1
                                    ),
                                    activeItem,
                                    ...container.items.slice(overItemIndex + 1),
                                ],
                            };
                        }
                    }

                    return container;
                });

                return newContainer;
            });
        },
        [kanban, update]
    );

    const activeItem = useMemo(() => {
        if (!activeItemId) return;
        return findEntityActiveItem(kanban, activeItemId);
    }, [kanban, activeItemId]);

    return {
        kanban,
        activeItem,
        onDragEnd,
        onDragStart,
        onDragOver,
        onDragCancel,
    };
};
