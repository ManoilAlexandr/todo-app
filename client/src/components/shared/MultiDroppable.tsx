import Droppable from "./Droppable";
import { cn } from "@/lib/utils";
import type { EntityContainer } from "@/types";

type Props = {
    containers: EntityContainer[];
};

const MultiDroppable: React.FC<Props> = ({ containers }) => {
    return (
        <div className={"grid h-full md:grid-cols-3 divide-x-1 border-1"}>
            {containers.map((container) => {
                const { id, title, items } = container;

                return (
                    <div key={id} className={cn("p-4")}>
                        <div className={cn("pb-4")}>
                            <div className={cn("text-lg font-semibold ")}>
                                {title}
                            </div>
                        </div>
                        <Droppable id={id} items={items} />
                    </div>
                );
            })}
        </div>
    );
};

export default MultiDroppable;
