import { memo, type FC, type PropsWithChildren } from "react";
import type { Layout, Task } from "@/types";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";

type TaskDialogProps = {
    layoutId: Layout;
    item: Task;
};

export const TaskDialog: FC<PropsWithChildren<TaskDialogProps>> = memo(
    ({ children, item }) => {
        const { title, description } = item;
        return (
            <Dialog>
                {children}
                <DialogContent className={"sm:max-w-3xl"}>
                    <DialogHeader>
                        <DialogTitle className={"text-2xl mb-4"}>
                            {title}
                        </DialogTitle>
                        <DialogDescription className={"text-md"}>
                            {description}
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button>Ok</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        );
    }
);
