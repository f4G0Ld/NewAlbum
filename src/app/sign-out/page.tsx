"use client";

import { authClient } from "@/server/db/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignOutPage() {
	const navigate = useRouter();

	useEffect(() => {
		authClient.signOut().then(() => {
			navigate.push("/");
		});
	}, [navigate]);

	return;
}
