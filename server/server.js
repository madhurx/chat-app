import { Server as socketIO } from "socket.io";
import dotenv from "dotenv";
import http from "http";
import app from "./app.js";

dotenv.config({ path: "dev.env" });

const port = process.env.PORT || 5000;

const server = http.createServer(app);
const io = new socketIO(server, { cors: { origin: "*" } });

//this will work when circuit gets on
io.on("connect", (socket) => {
	console.log("New User, Socket ID:", socket.id);
	socket.on("disconnect", () => {
		console.log("User disconnected");
	});
});

server.listen(port, () => {
	console.log(`App listening on port ${port}! 🔥`);
	console.log(`Server is working on http://localhost:${port}`);
});
