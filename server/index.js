import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import tasksRoutes from "./routes/tasks.route.js";
import path from "path";

const app = express();

const corsOptions = {
    origin: "http://localhost:5173",
};

app.use(cors(corsOptions), express.json());
app.use("/api/tasks", tasksRoutes);

const __dirname = path.resolve();
const distPath = path.resolve(__dirname, "client/dist");

if (process.env.NODE_ENV === "production") {
    app.use(express.static(distPath));

    app.get("/", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
    });
}

app.listen(5000, () => {
    connectDB();
    console.log("Server started on port 5000");
});
