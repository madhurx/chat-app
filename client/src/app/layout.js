import "./globals.css";

export const metadata = {
	title: "Chat App",
	description: "Application for chating",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
