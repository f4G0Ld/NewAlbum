import { Header } from "@/src/components/header";
import { Ticket } from "@/src/components/ticket";
import Image from "next/image";
import EventBackground from "../../public/EventBackground.svg";
import LiveNationLogo from "../../public/LiveNationLogo.svg";
import TicketMasterLogo from "../../public/TicketmasterLogo.svg";
import ConcertUALogo from "../../public/ConcertUALogo.svg";
import bg1 from "../../public/bg1.svg";
import { Button } from "@/components/ui/button";

export default function Event() {
	return (
		<div className="">
			<Header />
			<div className="relative flex flex-col items-center justify-center max-w-480 mx-auto">
				<div className="absolute -z-10 min-h-120 inset-0 mx-12">
					<Image
						className="object-cover"
						src={EventBackground}
						alt="!"
						fill={true}
					/>
				</div>
				<div className="h-full flex items-center justify-center my-21">
					<Ticket />
				</div>
			</div>
			<div className="my-6 space-y-6 max-w-480 mx-auto">
				<div className="font-[Anton] mx-12">
					<div className="px-12 py-5 flex justify-between items-center outline outline-[#161A1B] bg-[url('/bg1.svg')] bg-cover bg-center w-full">
						<Image src={LiveNationLogo} alt="Live-Nation-Logo" />
						<Button className="py-5 px-15 rounded-none">BUY</Button>
					</div>
				</div>
				<div className="font-[Anton] mx-12">
					<div className="px-12 py-5 flex justify-between items-center outline outline-[#161A1B] bg-[url('/bg2.svg')] bg-cover bg-center w-full">
						<Image src={TicketMasterLogo} alt="Live-Nation-Logo" />
						<Button className="py-5 px-15 rounded-none">BUY</Button>
					</div>
				</div>
				<div className="font-[Anton] mx-12">
					<div className="px-12 py-5 flex justify-between items-center outline outline-[#161A1B] bg-[url('/bg1.svg')] bg-cover bg-center w-full">
						<Image src={ConcertUALogo} alt="Live-Nation-Logo" />
						<Button className="py-5 px-15 rounded-none">BUY</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
