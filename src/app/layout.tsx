import "@fontsource/open-sans-condensed";
import "./globals.css";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`text-[Open Sans Condensed]`}>{children}</body>
		</html>
	);
}
