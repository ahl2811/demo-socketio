import http from "http";
import express from "express";
import { Server } from "socket.io";

const app = express();
const server = http.Server(app);
const io = new Server(server, { cors: { origin: "*" } });

app.get("/", (req, res) => {
  res.send({ message: "Server is already..." });
});

io.on("connection", (socket) => {
  console.log("New client connected");
  console.log(socket);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });

  socket.on("chat message", (message) => {
    io.emit("message", message);
    console.log(message);
  });
});

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log("App listening at PORT " + PORT);
});
