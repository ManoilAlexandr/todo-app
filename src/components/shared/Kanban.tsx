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
import MultiDroppable from "./MultiDroppable";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import Draggable from "./Draggable";
import { useDrag } from "../../hooks/useDrag";

const Kanban = () => {
    const {
        kanban,
        activeItem,
        onDragStart,
        onDragEnd,
        onDragOver,
        onDragCancel,
    } = useDrag();

    const sensors = useSensors(
        useSensor(
            PointerSensor
            //     {
            //     activationConstraint: {
            //         delay: 20,
            //         tolerance: 100,
            //     },
            // }
        ),
        useSensor(TouchSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    return (
        <div>
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
        </div>
    );
};

export default Kanban;
