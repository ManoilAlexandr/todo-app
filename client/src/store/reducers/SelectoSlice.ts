import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SelectoSliceState = {
    selectedIds: string[];
};

const initialState: SelectoSliceState = {
    selectedIds: [],
};

const SelectoSlice = createSlice({
    name: "selecto",
    initialState,
    reducers: {
        select: (state, action: PayloadAction<string[]>) => {
            console.log("🚀 ~ action:", action);
            state.selectedIds = action.payload;
        },
    },
});

export default SelectoSlice.reducer;

export const { select } = SelectoSlice.actions;
