import type {
    DragEndEvent,
    DragOverEvent,
    DragStartEvent,
    UniqueIdentifier,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
    findContainerId,
    findEntityActiveItem,
    findItemContainerAndItem,
    removeItem,
    reorderTasks,
} from "@/lib/utils.ts";
import { taskAPI } from "@/services/TaskService.ts";
import { EntityContainer } from "@/types.ts";
import { useAppDispatch, useAppSelector } from "./redux";
import { select } from "@/store/reducers/SelectoSlice";

export const useDrag = () => {
    const [kanban, setKanban] = useState<EntityContainer[]>([]);
    const selectedIds = useAppSelector((state) => state.selecto.selectedIds);
    const dispatch = useAppDispatch();
    const { data = [] } = taskAPI.useGetTasksQuery();
    const [updateTasks] = taskAPI.useUpdateTasksMutation();

    useEffect(() => {
        setKanban(data);
    }, [data]);

    const [activeItemId, setActiveItemId] = useState<UniqueIdentifier | null>(
        null
    );

    const onDragStart = useCallback(
        (event: DragStartEvent) => {
            const { active } = event;
            if (!active.id) return;

            if (selectedIds?.length) dispatch(select([]));

            setActiveItemId(active.id);
        },
        [selectedIds]
    );

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

            const containerIndex = kanban.findIndex(
                (container) => container.id === activeContainerId
            );

            if (containerIndex === -1) {
                setActiveItemId(null);

                return;
            }

            const container = kanban[containerIndex];

            const activeIndex = container.items.findIndex(
                (item) => item._id === activeId
            );
            const overIndex = container.items.findIndex(
                (item) => item._id === overId
            );

            const result = findItemContainerAndItem(activeId, kanban);

            if (!result) {
                setActiveItemId(null);
                return;
            }

            const { container: activeContainer, item: activeItem } = result;

            if (
                (activeIndex === overIndex || overIndex === -1) &&
                activeContainer.id === activeItem.status &&
                activeContainer.id === overContainerId
            ) {
                setActiveItemId(null);
                return;
            }

            const newItems = arrayMove(container.items, activeIndex, overIndex);

            const updatedState = kanban.map((c, i) => {
                if (i === containerIndex) {
                    return { ...c, items: newItems };
                }

                return c;
            });

            updatedState[containerIndex].items = newItems;

            const updatedTasks = updatedState.flatMap((container) =>
                reorderTasks(container.id, container.items)
            );

            updateTasks(updatedTasks);

            setKanban((container) => {
                return container.map((c, i) => {
                    if (i === containerIndex) {
                        return { ...c, items: newItems };
                    }

                    return c;
                });
            });

            setActiveItemId(null);
        },
        [kanban, updateTasks]
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

            setKanban((kanban) => {
                const activeContainer = kanban.find(
                    (container) => container.id === activeContainerId
                );
                if (!activeContainer) return kanban;

                const activeItem = activeContainer.items.find(
                    (item) => item._id === activeId
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
                            (item) => item._id === overId
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
        [kanban]
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
