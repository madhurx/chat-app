import "./globals.css";
import { Roboto } from "next/font/google";
const roboto = Roboto({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-roboto",
	weight: ["300"],
});

export const metadata = {
	title: "Chat App",
	description: "Application for chatting",
};

export default function RootLayout({ children }) {
	return (
		<html className={`${roboto.variable}`}>
			<body className="m-0">{children}</body>
		</html>
	);
}
