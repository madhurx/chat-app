import "./globals.css";

export const metadata = {
	title: "Chat App",
	description: "Application for chatting",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={inter.className}>{children}</body>
		</html>
	);
}
