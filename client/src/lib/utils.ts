import type { UniqueIdentifier } from "@dnd-kit/core/dist/types/other";
import { arrayMove } from "@dnd-kit/sortable";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { EntityContainer, Layout, Task } from "@/types";

type ID = {
    id: number;
};

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const getEntityIndex = <T extends ID>(
    entities: T[],
    id: number
): number => entities.findIndex((entity: T) => entity.id === id);

export const findEntityById = <T extends ID>(entities: T[], id: number) => {
    return entities.find((entity: T) => entity.id === id)!;
};

export const findEntityActiveItem = (
    entities: EntityContainer[],
    id: UniqueIdentifier
) => {
    const entityItems = entities.flatMap((entity) => entity.items);
    const activeItem = entityItems.find((item) => item._id === id)!;

    return activeItem;
};

export const getEntityPosition = <T extends ID>(entities: T[], id: number) => {
    return getEntityIndex(entities, id);
};

export const findContainerId = (
    kanban: EntityContainer[],
    itemId: UniqueIdentifier
) => {
    const isContainer = kanban.some((container) => container.id === itemId);

    if (isContainer) return itemId;

    return kanban.find((container) =>
        container.items.some((item) => item._id === itemId)
    )?.id as Layout;
};

export const findContainerByItemId = (
    kanban: EntityContainer[],
    itemId: UniqueIdentifier
): EntityContainer | undefined =>
    kanban.find((container) =>
        container.items.some((item) => item._id === itemId)
    );
export const moveItemWithinContainer = (
    container: EntityContainer,
    fromIndex: number,
    toIndex: number
): EntityContainer => ({
    ...container,
    items: arrayMove(container.items, fromIndex, toIndex),
});
export const removeItem = (
    items: EntityContainer["items"],
    id: UniqueIdentifier
) => items.filter((item) => item._id !== id);

export const findItemContainerAndItem = (
    itemId: UniqueIdentifier,
    kanban: EntityContainer[]
) => {
    for (const container of kanban) {
        const item = container.items.find((item) => item._id === itemId);
        if (item) {
            return { container, item };
        }
    }
    return null;
};

export const getAvailableContainers = (
    kanban: EntityContainer[],
    filterBy?: Layout
) => {
    const options = kanban.map((board) => board.id);
    return filterBy ? options.filter((option) => option !== filterBy) : options;
};

export const formatTasksToKanban = (tasks: Task[]) => {
    const kanban: EntityContainer[] = [
        { id: Layout.Todo, title: "To Do", items: [] },
        { id: Layout.InProgress, title: "In Progress", items: [] },
        { id: Layout.Done, title: "Done", items: [] },
    ];

    tasks.forEach((task) => {
        kanban.forEach((container) => {
            if (container.id === task.status) {
                container.items[task.position] = task;
            }
        });
    });

    return kanban;
};

export const reorderTasks = (columnId: Layout, tasks: Task[]): Task[] => {
    return tasks.map((task, index) => ({
        ...task,
        status: columnId,
        position: index,
    }));
};
