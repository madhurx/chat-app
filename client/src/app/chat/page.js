"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import SendIcon from "@mui/icons-material/Send";
import Message from "../components/Message";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const ENDPOINT = "https://chat-app-backend-usjt.onrender.com/";

const page = () => {
	const searchParams = useSearchParams();
	const username = searchParams.get("username");
	const [id, setId] = useState("");
	const socket = io(ENDPOINT, {
		transports: ["websocket", "polling", "flashsocket"],
	});
	const [messages, setMessages] = useState([]);

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
			console.log("Connected");
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
			setMessages([...messages, data]);
		});

		socket.on("userJoined", (data) => {
			setMessages([...messages, data]);
		});

		socket.on("leave", (data) => {
			setMessages([...messages, data]);
		});

		return () => {
			socket.on("disconnect");
			socket.off();
		};
	}, []);

	useEffect(() => {
		socket.on("sendMessage", (data) => {
			setMessages([...messages, data]);
			console.log(data.message, data.user);
		});
		return () => {
			socket.off();
		};
	}, [messages]);

	const messagesEndRef = useRef(null);
	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	return (
		<div className="container w-full bg-gray-900 max-w-screen-2xl h-screen text-white">
			<div className="grid h-screen items-center w-full">
				<div className="flex flex-col border-white border col-span-full h-[50vh] mx-auto w-[50vw] items-center">
					<div className="basis-2/12 overflow-hidden bg-cyan-700 text-white w-full">
						<div className="block items-center h-full w-full px-4">
							<h2 className="font-bold tracking-widest float-left items-center flex h-full">
								Conversify
							</h2>
							<a
								href="/"
								className="float-right h-full flex items-center hover:scale-110 cursor-pointer">
								<CloseRoundedIcon />
							</a>
						</div>
					</div>
					<div className="basis-8/12 overflow-y-scroll overflow-x-hidden w-full">
						{messages.map((data) => (
							<Message
								message={data.message}
								sendBy={data.id === id ? "self" : "other"}
								user={data.id === id ? null : data.user}
							/>
						))}

						<div ref={messagesEndRef} className="clear-both" />
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
