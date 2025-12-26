import { Header } from "@/src/components/header";
import EventBackground from "../../public/EventBackground.svg";
import Image from "next/image";
import { Ticket } from "@/src/components/ticket";

export default function Event() {
	return (
		<div>
			<Header />
			<div className="relative flex flex-col items-center justify-center">
				<div className="absolute -z-10  min-h-120 inset-0 mx-12">
					<Image
						className="object-cover"
						src={EventBackground}
						alt="!"
						fill={true}
					/>
				</div>
				<div className="relative ">
					<Ticket />
				</div>
			</div>
		</div>
	);
}
