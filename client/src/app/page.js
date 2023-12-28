import io from "socket.io-client";

const ENDPOINT = "http://localhost:3000/";
const socket = io(ENDPOINT, { transports: ["websocket"] });

export default function Home() {
	socket.on("connect", () => {});
	return (
		<div>
			<h1>HOMEPAGE</h1>
		</div>
	);
}
