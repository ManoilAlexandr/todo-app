import Draggable from "./Draggable";
import {
    SortableContext,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { cn } from "@/lib/utils";
import { Layout, type Task } from "@/types";
import { useDroppable } from "@dnd-kit/core";
import FunctionalTask from "./Task";

type Props = {
    id: Layout;
    items: Task[];
};

const Droppable: React.FC<Props> = ({ items, id }) => {
    const { setNodeRef } = useDroppable({ id });
    return (
        <div ref={setNodeRef}>
            <SortableContext
                id={id}
                strategy={verticalListSortingStrategy}
                items={items.map((item) => ({ id: item._id }))}
            >
                <ul className={cn("grid gap-3")}>
                    {items.map((item) => (
                        <FunctionalTask
                            key={item._id}
                            layoutId={id}
                            item={item}
                        >
                            <Draggable item={item} />
                        </FunctionalTask>
                    ))}
                </ul>
            </SortableContext>
        </div>
    );
};

export default Droppable;
