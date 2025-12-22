"use client";

import Image from "next/image";
import GroupLogoIcon from "../../public/GroupLogoIcon.svg";
import Link from "next/link";
import { PiSignOutBold } from "react-icons/pi";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";

export default function Admin() {
	const loadFilesMutation = useMutation({
		mutationFn: async (value: File[]) => {
			const formData = new FormData();

			value.forEach((f) => formData.append("files", f));

			const res = await fetch("/api/files", {
				method: "POST",
				body: formData,
				credentials: "include",
			});

            if (!res.ok) {
                console.error(res.status)
                throw new Error('Ошибка получения')
            }

			return res;
		},
	});

	const form = useForm({
		defaultValues: {
			file: null as File[] | null,
		},
		onSubmit: async ({ value }) => {
			await loadFilesMutation.mutateAsync(value.file!);
		},
	});

	return (
		<div className="px-15 py-10 flex flex-col gap-20">
			<div className="flex justify-between">
				<Link href="/">
					<Image src={GroupLogoIcon} alt="!" width={124} height={60} />
				</Link>
				<Link href="/sign-out" className="flex gap-3 items-center">
					<p className="text-[24px]">Sign Out</p>
					<PiSignOutBold size={40} />
				</Link>
			</div>
			<h1 className="text-[40px] leading-none">Admin Panel</h1>
			<input type="file" multiple />
		</div>
	);
}
