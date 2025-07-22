import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Task } from "@/types";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type TaskFormProps = {
    task?: Task;
    onSubmit(task: Task): Promise<boolean>;
};

const TaskFormSchema = z
    .object({
        title: z
            .string()
            .min(5, { message: "Title should be at least 5 characters" }),
        description: z
            .string()
            .min(5, { message: "Description should be at least 5 characters" }),
    })
    .passthrough();

type TaskFormSchemaData = z.infer<typeof TaskFormSchema>;

const TaskForm = (props: TaskFormProps) => {
    const { task, onSubmit } = props;

    const form = useForm<TaskFormSchemaData>({
        defaultValues: {
            title: "",
            description: "",
        },
        resolver: zodResolver(TaskFormSchema),
    });

    useEffect(() => {
        if (task) {
            form.reset(task);
        }
    }, [task]);

    const onSubmitHandler = async (data: TaskFormSchemaData) => {
        const isSuccess = await onSubmit(data as Task);

        if (isSuccess)
            form.reset(
                { title: data.title, description: data.description },
                { keepDefaultValues: false }
            );
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitHandler)}>
                <div className={"grid gap-4"}>
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input
                                        autoComplete="off"
                                        placeholder="Title"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Input
                                        autoComplete="off"
                                        placeholder="Description"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant={"outline"}>Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Submit</Button>
                    </DialogFooter>
                </div>
            </form>
        </Form>
    );
};

export default TaskForm;
