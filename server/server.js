import { Server as socketIO } from "socket.io";
import dotenv from "dotenv";
import http from "http";
import app from "./app.js";

dotenv.config({ path: "dev.env" });

const port = process.env.PORT || 5000;

const server = http.createServer(app);
const io = new socketIO(server, { cors: { origin: "*" } });

const users = [{}];

//this will work when circuit gets on
io.on("connect", (socket) => {
	console.log("New User, Socket ID:", socket.id);

	socket.on("joined", ({ username }) => {
		users[socket.id] = username;
		console.log(username + " has joined.");

		socket.broadcast.emit("userJoined", {
			user: "Admin",
			message: `${users[socket.id]} has joined`,
		});

		socket.emit("welcome", {
			user: "Admin",
			message: `Welcome to the chat`,
		});
	});

	socket.on("disconnect", () => {
		console.log(`user disconnected`);
		socket.broadcast.emit("leave", {
			user: "Admin",
			message: `${users[socket.id]} has left the chat`,
		});
		socket.removeAllListeners();
	});
});

server.listen(port, () => {
	console.log(`App listening on port ${port}! 🔥`);
	console.log(`Server is working on http://localhost:${port}`);
});
