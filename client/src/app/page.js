"use client";
import { useEffect } from "react";
import io from "socket.io-client";
import Join from "./components/Join";

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
		<div className = "container w-full bg-gray-900 max-w-screen-2xl h-screen text-white">
			<Join />
		</div>
	);
}
