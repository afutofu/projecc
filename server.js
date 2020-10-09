const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");

const { connectSocket } = require("./websockets");

const PORT = process.env.PORT || 5000;

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// IMPORT ROUTES
const routes = require("./routes");
const projectRoutes = require("./routes/api/projects");
const channelRoutes = require("./routes/api/channels");
const messageRoutes = require("./routes/api/messages");
const userRoutes = require("./routes/api/users");
const friendRoutes = require("./routes/api/friend");
const directMessageRoutes = require("./routes/api/directMessage");
const authRoutes = require("./routes/api/auth");

// ROUTES
app.use("/", routes);
app.use("/api/projects", projectRoutes);
app.use("/api/projects/:projectId/channels", channelRoutes);
app.use("/api/projects/:projectId/channels/:channelId/messages", messageRoutes);
app.use("/api/users", userRoutes);
app.use("/api/users/:userId/friends", friendRoutes);
app.use("/api/users/:userId/directMessages", directMessageRoutes);
app.use("/api/auth", authRoutes);

// CONNECT TO DB
mongoose.connect(
  process.env.DB_CONNECTION,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  () => console.log("Connected to DB!")
);

// WEBSOCKETS
const server = http.createServer(app);
connectSocket(server);

// START SERVER
server.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});
