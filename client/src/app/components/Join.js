"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Join = () => {
	const [name, setName] = useState("");

	const sendName = (e) => {
		const username = name.replaceAll(/\s/g, "");
		if (username === "") {
			e.preventDefault();
		} else {
			setName(username);
		}
	};

	return (
		<div className="grid h-screen items-center w-full">
			<div className="flex flex-col border-white border col-span-full max-h-fit min-h-[50vh] mx-auto max-w-fit min-w-[50vw] items-center">
				<div className="pt-3 flex-auto">
					<Image
						src={"/images/conversify-logo.jpg"}
						width={100}
						height={100}
						alt="conversify-logo"
						className=" rounded-full"
					/>
				</div>

				<div className="flex-auto">
					<h1 className="text-3xl py-1">Conversify</h1>
				</div>

				<div className="flex items-center border-b border-teal-500 py-2 mb-3 flex-auto  hover:border-teal-600 hover:scale-110 focus-within:scale-110 focus-within:border-b-2">
					<input
						className="appearance-none bg-transparent border-none w-full text-gray-50 py-1 px-2 leading-tight focus:outline-none"
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</div>

				<div className="flex-auto py-2">
					<Link href={{ pathname: `/chat`, query: { username: name } }}>
						<button
							className=" bg-teal-500 py-2 px-5 rounded-lg hover:bg-teal-600 hover:scale-110"
							onClick={(e) => sendName(e)}>
							Start
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Join;
