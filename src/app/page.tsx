import Image from "next/image";
import { Header } from "../components/header";
import MainBackground from "../public/MainBackground.svg";
import VinylLogo from "../public/VinulLogo.svg";

export default function Main() {
	return (
		<div className="flex flex-col justify-center">
			<div>
				<Header />
				<div className=" max-w-480 mx-auto">
					<div className="flex justify-between items-end mx-12 mt-15">
						<div className="flex flex-col gap-5 leading-none">
							<p className="text-[24px]">NEW FIFTH ALBUM</p>
							<h1 className="text-[60px]">
								AM
								<br /> Artic Monkey
							</h1>
						</div>
						<div className="bg-[#161A1B] text-[#DCD9D2] px-8 py-4 h-fit ">
							<p className="">Release Date</p>
							<p className="text-[24px] font-bold">September 9</p>
						</div>
					</div>

					<div className="relative">
						<Image
							className="absolute mx-12 mb-12 pb-12"
							src={MainBackground}
							alt="!"
							width={1824}
							height={909}
						/>
						<div className="relative flex justify-center">
							<span className="text-[40px] font-[Anton] bg-[#FFE484] p-7.5 rounded-full absolute transform translate-x-64 -translate-y-1/16 z-20">
								new
							</span>
							<Image
								className="absolute top-1/2.5 right-1/4 rounded-full hover:animate-spin hover:[animation-duration:3s]"
								src={VinylLogo}
								alt="!"
								width={840}
								height={840}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
