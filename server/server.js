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
const projectsRoute = require("./routes/api/projects");
const channelsRoute = require("./routes/api/channels");

// ROUTES
app.use("/", routes);
app.use("/api/projects", projectsRoute);
app.use("/api/projects/:projectId/channels", channelsRoute);

// CONNECT TO DB
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
  () => console.log("Connected to DB!")
);

// WEBSOCKETS
const server = http.createServer(app);
connectSocket(server);

// START SERVER
server.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});
