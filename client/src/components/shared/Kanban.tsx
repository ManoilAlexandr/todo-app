import {
    closestCorners,
    DndContext,
    DragOverlay,
    KeyboardSensor,
    PointerSensor,
    TouchSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useDrag } from "@/hooks/useDrag";
import Draggable from "./Draggable";
import MultiDroppable from "./MultiDroppable";
import TaskMultiSelecto from "./TaskMultiSelecto";
import { useRef } from "react";
import SelectoRemoveBin from "./SelectoRemoveBin";

const Kanban = () => {
    const kanbanContainer = useRef(null);

    const {
        kanban,
        activeItem,
        onDragStart,
        onDragEnd,
        onDragOver,
        onDragCancel,
    } = useDrag();

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                delay: 50,
                tolerance: 20,
            },
        }),
        useSensor(TouchSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    return (
        <>
            <div id={"kanban"} ref={kanbanContainer}>
                <DndContext
                    collisionDetection={closestCorners}
                    onDragStart={onDragStart}
                    onDragEnd={onDragEnd}
                    onDragCancel={onDragCancel}
                    onDragOver={onDragOver}
                    sensors={sensors}
                >
                    <MultiDroppable containers={kanban} />
                    <DragOverlay
                        adjustScale
                        dropAnimation={{
                            duration: 150,
                            easing: "cubic-bezier(.18, .67, .6, 1.22)",
                        }}
                    >
                        {activeItem ? (
                            <Draggable
                                className={"bg-blue-50 cursor-grabbing"}
                                item={activeItem}
                            />
                        ) : null}
                    </DragOverlay>
                </DndContext>
                <TaskMultiSelecto container={kanbanContainer.current} />
            </div>
            <SelectoRemoveBin />
        </>
    );
};

export default Kanban;
