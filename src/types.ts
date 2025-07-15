export type Task = {
    id: number;
    title: string;
    description: string;
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
