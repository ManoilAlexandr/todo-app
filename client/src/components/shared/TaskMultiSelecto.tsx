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
                }}
            />
        </>
    );
};

export default TaskMultiSelecto;
