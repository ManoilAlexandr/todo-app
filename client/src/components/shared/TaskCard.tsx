import { memo } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { cn } from "@/lib/utils";
import { ScrollArea } from "../ui/scroll-area";
import { UniqueIdentifier } from "@dnd-kit/core";
import dayjs from "dayjs";

type TaskProps = {
    id: UniqueIdentifier;
    title: string;
    description: string;
    className?: string;
    createdAt: string;
};

const TaskCard = memo((props: TaskProps) => {
    const { id, title, description, className, createdAt } = props;

    const onDBClick = () => {
        console.log("Double click");
    };

    const dateFormat = "MMM DD, hh:mm:ss";

    return (
        <Card
            onDoubleClick={onDBClick}
            className={cn(`touch-none rounded-sm p-0`, className)}
            data-id={id}
        >
            <CardHeader className={"gap-2 px-4 py-4"}>
                <CardTitle className={"flex gap-2 justify-between"}>
                    <div>{title}</div>
                    <div className="text-xs">
                        <span>{dayjs(createdAt).format(dateFormat)}</span>
                    </div>
                </CardTitle>
                <CardDescription>
                    <ScrollArea className="h-10">{description}</ScrollArea>
                </CardDescription>
            </CardHeader>
        </Card>
    );
});

export default TaskCard;
