'use client'

import "@fontsource/open-sans-condensed";
import "@fontsource/anton";
import "./globals.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../queryClient";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`text-[Open Sans Condensed]`}><QueryClientProvider client={queryClient}>{children}</QueryClientProvider></body>
		</html>
	);
}
