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

// server.js
// import express from 'express';
// import http from 'http';
// import { Server as SocketIOServer } from 'socket.io';
// import cors from 'cors';

// const app = express();
// const server = http.createServer(app);
// const io = new SocketIOServer(server);

// const PORT = process.env.PORT || 5000;

// // Use the cors middleware
// app.use(cors({ origin: 'http://localhost:3000' }));

// // Set up Socket.IO connections
// io.on('connect', (socket) => {
//   console.log('A user connected');

//   // Handle Socket.IO events here

//   socket.on('disconnect', () => {
//     console.log('A user disconnected');
//   });
// });

// // Set up Express routes and middleware

// server.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
