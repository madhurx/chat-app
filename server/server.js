import { Server as socketIO } from "socket.io";
import dotenv from "dotenv";
import http from "http";
import app from "./app.js";

dotenv.config({ path: "dev.env" });

const port = process.env.PORT || 3000;

const server = http.createServer(app);
const io = new socketIO(server);

server.listen(port, () => {
	console.log(`App listening on port ${port}! 🔥`);
	console.log(`Server is working on http://localhost:${port}`);
});

//this will work when circuit gets on
io.on("connection", () => {
	console.log("New Connection");
});
