const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

require("dotenv").config();

const express = require("express");
const cors = require("cors"); // Added
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Added: Allow requests from your React frontend
app.use(
    cors({
        origin: [
            "http://localhost:5173",
            process.env.FRONTEND_URL
        ].filter(Boolean),
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"]
    })
);

// Parse JSON request bodies
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Health-check endpoint
app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Task Manager API is running"
    });
});

// Connect to MongoDB before starting the server
const startServer = async () => {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
};

startServer();
