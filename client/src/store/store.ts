import {
    combineReducers,
    configureStore,
    isFulfilled,
    isRejectedWithValue,
    Middleware,
} from "@reduxjs/toolkit";
import taskReducer from "./reducers/TaskSlice";
import { taskAPI } from "@/services/TaskService";
import { toast } from "sonner";
import loaderReducer, { hide, show } from "./reducers/LoaderSlice";
import selectoReducer from "./reducers/SelectoSlice";

const rootReducer = combineReducers({
    selecto: selectoReducer,
    task: taskReducer,
    loader: loaderReducer,
    [taskAPI.reducerPath]: taskAPI.reducer,
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(
                taskAPI.middleware,
                // loaderReducer.middleware,
                rtkQueryErrorLogger,
                rtkQuerySuccessLogger,
                loaderMiddleware
            ),
    });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];

const rtkQueryErrorLogger: Middleware = () => (next) => (action) => {
    if (isRejectedWithValue(action)) {
        toast.error(action.error.message);
    }
    return next(action);
};

const rtkQuerySuccessLogger = () => (next) => (action) => {
    // Проверка на fulfilled RTK Query actions
    if (
        isFulfilled(action) &&
        action.meta?.arg?.endpointName // фильтруем только RTK Query endpoints
    ) {
        const endpoint = action.meta.arg.endpointName;

        // Пример: показываем toast только для определённых endpoint'ов
        if (
            ["deleteTasks", "addTask", "deleteTask", "updateTask"].includes(
                endpoint
            )
        ) {
            toast.success(successMessages[endpoint]);
        }
    }

    return next(action);
};

const successMessages = {
    addTask: "Задача успешно создана",
    deleteTask: "Задача успешно удалена",
    deleteTasks: "Задачи успешно удалены",
    updateTask: "Задача успешно обновлена",
};

const loaderMiddleware = () => (next) => (action) => {
    const isRTKQuery = action.meta?.arg?.endpointName;

    if (action.type.endsWith("/pending") && isRTKQuery) {
        const endpoint = action.meta.arg.endpointName;

        if (
            ["deleteTasks", "addTask", "deleteTask", "updateTask"].includes(
                endpoint
            )
        ) {
            next(show());
        }
    }

    if (
        action.type.endsWith("/fulfilled") ||
        action.type.endsWith("/rejected")
    ) {
        next(hide());
    }

    return next(action);
};
