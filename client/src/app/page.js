"use client";
import { useEffect } from "react";
import io from "socket.io-client";

const ENDPOINT = "http://localhost:5000/";
const socket = io(ENDPOINT, {
	transports: ["websocket", "polling", "flashsocket"],
});

export default function Home() {
	useEffect(() => {
		socket.on("connect", (data) => {
			"Received data from server:", data;
		});

		socket.on("connect_error", (err) => {
			console.log(`Connect error due to ${err.message}`);
		});

		return () => {
			socket.disconnect();
		};
	}, []);

	return (
		<div>
			<h1>HOMEPAGE</h1>
		</div>
	);
}
