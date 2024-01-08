const Message = ({ message, user, sendBy }) => {
	const msgDirection =
		sendBy === "self"
			? "bg-cyan-500 float-right text-black"
			: sendBy === "other"
			? "bg-gray-700 float-left text-white"
			: "";
	if (user) {
		return (
			<div
				className={`max-w-[60%] w-fit px-2 py-1 m-2 rounded-xl flex flex-wrap float-right font-sans font-normal ${msgDirection} clear-both`}>
				{`${user}: ${message}`}
			</div>
		);
	} else {
		return (
			<div
				className={`max-w-[60%] w-fit px-2 py-1 m-2 rounded-xl flex flex-wrap float-right font-sans font-normal ${msgDirection} clear-both`}>
				{`You: ${message}`}
			</div>
		);
	}
};

export default Message;
