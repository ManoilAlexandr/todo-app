import { UniqueIdentifier } from "@dnd-kit/core";

export type Task = {
    id: UniqueIdentifier;
    title: string;
    description: string;
    status: Layout;
    position: number;
    createdAt: string;
    updatedAt: string;
};

export type EntityContainer = {
    id: Layout;
    title: string;
    items: Task[];
};

export enum Layout {
    Todo = "Todo",
    InProgress = "InProgress",
    Done = "Done",
}
