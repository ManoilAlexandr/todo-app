import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { EntityContainer, Task } from "@/types";
import { formatTasksToKanban } from "@/lib/utils";
import { UniqueIdentifier } from "@dnd-kit/core";

type TaskResponse<T> = {
    task: T;
    success: boolean;
};
export const taskAPI = createApi({
    reducerPath: "taskAPI",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
    tagTypes: ["Task"],
    endpoints: (builder) => ({
        getTasks: builder.query<EntityContainer[], void>({
            query: () => ({
                url: "/api/tasks",
            }),
            providesTags: ["Task"],
            transformResponse: (response: Task[]) =>
                formatTasksToKanban(response),
        }),
        getTask: builder.query<TaskResponse<Task>, UniqueIdentifier>({
            query: (id: UniqueIdentifier) => ({
                url: `/api/tasks/${id}`,
            }),
        }),
        addTask: builder.mutation<TaskResponse<Task>, Task>({
            query: (task: Task) => ({
                url: "/api/tasks",
                method: "POST",
                body: task,
            }),
            invalidatesTags: ["Task"],
        }),
        updateTask: builder.mutation<TaskResponse<Task>, Task>({
            query: (task: Task) => ({
                url: `/api/tasks/${task._id}`,
                method: "PUT",
                body: task,
            }),
            invalidatesTags: ["Task"],
        }),
        updateTasks: builder.mutation<TaskResponse<Task[]>, Task[]>({
            query: (tasks: Task[]) => ({
                url: "/api/tasks/reorder",
                method: "PUT",
                body: tasks,
            }),
            invalidatesTags: ["Task"],
        }),
        deleteTask: builder.mutation<TaskResponse<Task>, UniqueIdentifier>({
            query: (id: UniqueIdentifier) => ({
                url: `/api/tasks/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Task"],
        }),
        deleteTasks: builder.mutation<TaskResponse<Task[]>, UniqueIdentifier[]>(
            {
                query: (ids: UniqueIdentifier[]) => ({
                    url: "/api/tasks/delete",
                    method: "DELETE",
                    body: ids,
                }),
                invalidatesTags: ["Task"],
            }
        ),
    }),
});
