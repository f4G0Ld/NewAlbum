"use client";

import Image from "next/image";
import GroupLogoIcon from "../../public/GroupLogoIcon.svg";
import Link from "next/link";
import { PiSignOutBold } from "react-icons/pi";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";
import { Button } from "@/components/ui/button";
import { UploadFiles } from "@/src/api";
import { queryClient } from "@/src/queryClient";

export default function Admin() {
	const loadFilesMutation = useMutation({
		mutationFn: async (value: File[]) => {
			const res = await UploadFiles(value);
			if (!res.ok) {
				console.log(res)
				throw new Error(String(res.status));
			}

			form.reset();
		},
		onSuccess: async () => {
			queryClient.invalidateQueries({ queryKey: ["files"] });
		},
	});

	const form = useForm({
		defaultValues: {
			file: null as File[] | null,
		},
		onSubmit: async ({ value }) => {
			if (value.file === null) {
				console.log("долбоеб, тут пусто");
			} else {
				await loadFilesMutation.mutateAsync(value.file);
			}
		},
	});

	const Field = form.Field;

	return (
		<div className="px-15 py-10 flex flex-col gap-20">
			<div className="flex justify-between">
				<Link href="/">
					<Image src={GroupLogoIcon} alt="!" width={124} height={60} />
				</Link>
				<Link href="/sign-out" className="flex gap-3 items-center">
					<p className="text-[24px]">Sign Out</p>
					<PiSignOutBold size={24} />
				</Link>
			</div>
			<h1 className="text-[40px] leading-none">Admin Panel</h1>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					form.handleSubmit();
				}}
			>
				<Field name="file">
					{(f) => (
						<div className="space-y-3">
							<h2 className="text-[20px]">Upload Song</h2>
							<input
								type="file"
								multiple
								accept="audio/"
								placeholder="Upload Song"
								onChange={(e) => {
									const files = e.target.files;
									if (files !== null) f.handleChange(Array.from(files));
								}}
							/>
						</div>
					)}
				</Field>
				<Button variant={"ghost"} type="submit">
					Button
				</Button>
			</form>
		</div>
	);
}
