"use client";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import io from "socket.io-client";
import SendIcon from "@mui/icons-material/Send";

const page = () => {
	const ENDPOINT = "http://localhost:5000/";
	const socket = io(ENDPOINT, {
		transports: ["websocket", "polling", "flashsocket"],
	});

	useEffect(() => {
		socket.on("connect", (data) => {
			console.log("Received data from server:", data);
		});

		socket.on("connect_error", (err) => {
			console.log(`Connect error due to ${err.message}`);
		});

		return () => {};
	}, [socket]);

	const searchParams = useSearchParams();
	const name = searchParams.get("username");

	return (
		<div className="container w-full bg-gray-900 max-w-screen-2xl h-screen text-white">
			<div className="grid h-screen items-center w-full">
				<div className="flex flex-col border-white border col-span-full h-[50vh] mx-auto w-[50vw] items-center">
					<div className="basis-2/12 overflow-hidden bg-cyan-400 text-white w-full"></div>
					<div className="basis-8/12 overflow-y-scroll overflow-x-hidden w-full">
						{name}
					</div>
					<div className="basis-2/12 overflow-hidden text-black w-full bg-gray-200">
						<div className="w-full h-full px-3 flex">
							<input
								type="text"
								className="h-full w-full flex-auto bg-transparent border-0 focus:outline-none"
							/>
							<button className="justify-end text-cyan-400 hover:scale-110">
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
