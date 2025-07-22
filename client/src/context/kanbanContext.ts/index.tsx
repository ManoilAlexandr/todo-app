import {
    createContext,
    useContext,
    useState,
    type FC,
    type PropsWithChildren,
} from "react";
import type { EntityContainer } from "@/types";

type TaskContext = {
    kanban: EntityContainer[];
    update: React.Dispatch<React.SetStateAction<EntityContainer[]>>;
};

const KanbanContext = createContext<TaskContext | null>(null);

export const KanbanProvider: FC<PropsWithChildren> = ({ children }) => {
    const [kanban, setKanban] = useState<EntityContainer[]>([]);

    return (
        <KanbanContext.Provider value={{ kanban, update: setKanban }}>
            {children}
        </KanbanContext.Provider>
    );
};

export const useKanban = (): TaskContext => {
    const context = useContext<TaskContext | null>(KanbanContext);

    if (!context)
        throw new Error("useKanban must be used within a KanbanProvider");

    return context as TaskContext;
};
