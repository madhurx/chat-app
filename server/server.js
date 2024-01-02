import { Server as socketIO } from "socket.io";
import dotenv from "dotenv";
import http from "http";
import app from "./app.js";

dotenv.config({ path: "dev.env" });

const port = process.env.PORT || 5000;

const server = http.createServer(app);
const io = new socketIO(server);

//this will work when circuit gets on
io.on("connection", (socket) => {
	console.log("New Connection, Socket ID:", socket.id);
});

server.listen(port, () => {
	console.log(`App listening on port ${port}! 🔥`);
	console.log(`Server is working on http://localhost:${port}`);
});