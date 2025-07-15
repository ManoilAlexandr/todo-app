import Kanban from "./components/shared/Kanban";
import { KanbanProvider } from "./context/kanbanContext.ts";

function App() {
    return (
        <KanbanProvider>
            <Kanban />
        </KanbanProvider>
    );
}

export default App;
