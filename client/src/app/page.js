import io from "socket.io-client";

const ENDPOINT = "http://localhost:3000/";
const socket = io.connect(ENDPOINT, { transports: ["polling", "websocket", "flashsocket"] });

export default function Home() {
	socket.on("connect", () => {
		console.log("Connected to the server");
	});
	socket.on("connect_error", (err) => {
		console.log(`connect_error due to ${err.message}`);
	});

	return (
		<div>
			<h1>HOMEPAGE</h1>
		</div>
	);
}
