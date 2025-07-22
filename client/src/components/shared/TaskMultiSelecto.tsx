import Selecto from "react-selecto";
import { useAppDispatch } from "@/hooks/redux";
import { select } from "@/store/reducers/SelectoSlice";

type SelectoProps = {
    container: HTMLElement | null;
};

const TaskMultiSelecto = ({ container }: SelectoProps) => {
    const dispatch = useAppDispatch();
    const onSelectTaskIds = (taskIds: string[]) => {
        dispatch(select(taskIds));
    };

    return (
        <>
            <Selecto
                container={container}
                selectableTargets={["[data-slot='card']"]}
                preventDragFromInside={false}
                selectByClick={false}
                hitRate={0}
                dragCondition={(e) =>
                    !e.inputEvent.target.closest("[data-slot='card']")
                }
                onSelect={(e) => {
                    onSelectTaskIds(e.selected.map((el) => el.dataset.id!));

                    e.added.forEach((el) => {
                        el.classList.remove("bg-card");
                        el.classList.add("bg-blue-50");
                    });
                    e.removed.forEach((el) => {
                        el.classList.remove("bg-blue-50");
                        el.classList.add("bg-card");
                    });
                }}
            />
        </>
    );
};

export default TaskMultiSelecto;
