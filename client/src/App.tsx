import { Provider } from "react-redux";
import { Toaster } from "sonner";
import Kanban from "./components/shared/Kanban.tsx";
import TaskCreateDialog from "./components/shared/TaskCUDialog/TaskCreateDialog.tsx";
import TaskCRUDDialog from "./components/shared/TaskCUDialog/TaskCRUDDialog.tsx";
import { setupStore } from "./store/store.ts";

const store = setupStore();

function App() {
    return (
        <Provider store={store}>
            <div
                className={
                    "container h-full grid grid-rows-[auto_1fr] mx-auto py-8"
                }
            >
                <div className="flex justify-end mb-4">
                    <TaskCreateDialog />
                </div>
                <Kanban />
            </div>
            <TaskCRUDDialog />
            <Toaster richColors />
        </Provider>
    );
}

export default App;
