import Image from "next/image";

const Join = () => {
	return (
		<div className="grid h-screen items-center w-full">
			<div className="flex flex-col border-white border col-span-full h-fit mx-auto max-w-fit min-w-[50vw] items-center">

				<div className="pt-3 flex-auto">
					<Image
						src={"/images/conversify-logo.jpg"}
						width={100}
						height={100}
						alt="conversify-logo"
						className=" rounded-full r "
					/>
				</div>

				<div className="flex-auto">
					<h1 className="text-3xl py-1">Conversify</h1>
				</div>

				<div className="flex items-center border-b border-teal-500 py-2 mb-3 flex-auto">
					<input
						className="appearance-none bg-transparent border-none w-full text-gray-700 py-1 px-2 leading-tight focus:outline-none"
						type="text"
						aria-label="Full name"
					/>
				</div>
                
				<div className="flex-auto py-2">
					<button className=" bg-teal-500 py-2 px-5 rounded-lg">Start</button>
				</div>
			</div>
		</div>
	);
};

export default Join;
