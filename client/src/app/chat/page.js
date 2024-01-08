"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import SendIcon from "@mui/icons-material/Send";
import Message from "../components/Message";

const ENDPOINT = "http://localhost:5000/";

const page = () => {
	const searchParams = useSearchParams();
	const username = searchParams.get("username");
	const [id, setId] = useState("");
	const socket = io(ENDPOINT, {
		transports: ["websocket", "polling", "flashsocket"],
	});

	const sendMessage = () => {
		const message = document.getElementById("chatInput").value;
		socket.emit("message", {
			message,
			id,
		});
		document.getElementById("chatInput").value = "";
	};
	const handleKeyPress = (event) => {
		if (event.key === "Enter") {
			sendMessage();
		}
	};

	useEffect(() => {
		//on for receiving data
		socket.on("connect", () => {
			alert("Connected");
			setId(socket.id);
		});

		socket.on("connect_error", (err) => {
			console.log(`Connect error due to ${err.message}`);
		});

		console.log(socket);

		//emit for sending data
		socket.emit("joined", {
			username,
		});

		socket.on("welcome", (data) => {
			alert(data.message);
		});

		socket.on("userJoined", (data) => {
			alert(data.message);
		});

		socket.on("leave", (data) => {
			alert(data.message);
		});

		return () => {
			socket.on("disconnect");
			socket.off();
		};
	}, []);

	useEffect(() => {
		socket.on("sendMessage", (data) => {
			alert(data.message + "--" + data.user + "--" + data.id);
		});
		return () => {};
	}, []);

	return (
		<div className="container w-full bg-gray-900 max-w-screen-2xl h-screen text-white">
			<div className="grid h-screen items-center w-full">
				<div className="flex flex-col border-white border col-span-full h-[50vh] mx-auto w-[50vw] items-center">
					<div className="basis-2/12 overflow-hidden bg-cyan-400 text-white w-full"></div>
					<div className="basis-8/12 overflow-y-scroll overflow-x-hidden w-full">
						<Message />
					</div>
					<div className="basis-2/12 overflow-hidden text-black w-full bg-gray-200">
						<div className="w-full h-full px-3 flex">
							<input
								type="text"
								className="h-full w-full flex-auto bg-transparent border-0 focus:outline-none"
								id="chatInput"
								onKeyDown={handleKeyPress}
							/>
							<button
								type="submit"
								className="justify-end text-cyan-400 hover:scale-110"
								onClick={sendMessage}>
								<SendIcon />
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default page;
