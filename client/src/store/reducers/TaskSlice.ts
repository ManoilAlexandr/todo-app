import { UniqueIdentifier } from "@dnd-kit/core";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TaskState = {
    isCreate: boolean;
    isUpdate: UniqueIdentifier | null;
    isDelete: UniqueIdentifier | null;
};

const initialState: TaskState = {
    isCreate: false,
    isUpdate: null,
    isDelete: null,
};

export const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        createTask: (state, action) => {
            state.isCreate = action.payload;
        },
        updateTask: (state, action: PayloadAction<UniqueIdentifier | null>) => {
            state.isUpdate = action.payload;
        },

        removeTask: (state, action: PayloadAction<UniqueIdentifier | null>) => {
            state.isDelete = action.payload;
        },
    },
});

export default taskSlice.reducer;

export const { createTask, updateTask, removeTask } = taskSlice.actions;
