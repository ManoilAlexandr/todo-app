import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import type React from "react";
import type { Task } from "@/types.ts";
import TaskCard from "./TaskCard";

type Props = {
    item: Task;
    className?: string;
};

const Draggable: React.FC<Props> = (props: Props) => {
    const { item, className = "" } = props;
    const { _id, title, description, createdAt } = item;

    const {
        isDragging,
        attributes,
        transition,
        listeners,
        setNodeRef,
        transform,
    } = useSortable({
        id: _id,
    });

    const style = {
        transition,
        transform: CSS.Translate.toString(transform),
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <li ref={setNodeRef} style={style} {...listeners} {...attributes}>
            <TaskCard
                id={_id}
                title={title}
                description={description}
                className={className}
                createdAt={createdAt}
            />
        </li>
    );
};

export default Draggable;
