import { memo } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { cn } from "../../lib/utils";
import { ScrollArea } from "../ui/scroll-area";

type TaskProps = {
    id: number;
    title: string;
    description: string;
    className?: string;
};

const TaskCard = memo((props: TaskProps) => {
    const { id, title, description, className } = props;

    return (
        <Card
            className={cn(`cursor-grab touch-none rounded-sm p-0`, className)}
        >
            <CardHeader className={"gap-2 px-4 py-4"}>
                <CardTitle>
                    {title} - {id}
                </CardTitle>
                <CardDescription>
                    <ScrollArea type="always" className="h-10">
                        {description}
                    </ScrollArea>
                </CardDescription>
            </CardHeader>
        </Card>
    );
});

export default TaskCard;
