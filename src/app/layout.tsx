import "@fontsource/open-sans-condensed";
import "@fontsource/anton";
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
