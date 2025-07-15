import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import type React from "react";
import type { Task } from "../../types";
import TaskCard from "./TaskCard.tsx";

type Props = {
    item: Task;
    className?: string;
};

const Draggable: React.FC<Props> = (props: Props) => {
    const { item, className = "" } = props;
    const { id, title, description } = item;

    const {
        isDragging,
        attributes,
        transition,
        listeners,
        setNodeRef,
        transform,
    } = useSortable({
        id,
    });

    const style = {
        transition,
        transform: CSS.Translate.toString(transform),
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <li ref={setNodeRef} style={style} {...listeners} {...attributes}>
            <TaskCard
                id={id}
                title={title}
                description={description}
                className={className}
            />
        </li>
    );
};

export default Draggable;
