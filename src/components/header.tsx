import Image from "next/image";
import GroupLogoIcon from "../public/GroupLogoIcon.svg";
import { FaSpotify, FaTwitter, FaYoutube } from "react-icons/fa";
import Link from "next/link";
import { AiFillInstagram } from "react-icons/ai";
import WaweIcon1 from "../public/WaweIcon1.svg";

export function Header() {
	return (
		<div className="flex justify-between p-12">
			<div className="flex gap-15 text-2xl items-center">
				<Link href="/">Store</Link>
				<Link href="/">Live</Link>
				<Link href="/event">Event</Link>
				<Link className="flex gap-2 items-center" href="/album">
					New album
					<Image
						className="w-7.5 h-3.75"
						src={WaweIcon1}
						alt="!"
						width={30}
						height={15}
					/>
				</Link>
			</div>
			<Link href="/">
				<Image src={GroupLogoIcon} alt="Group Logo" width={121} height={61} />
			</Link>
			<div className="flex gap-5 items-center">
				<a href="/" target="_blank" rel="noopener norefferer">
					<FaTwitter size={30} />
				</a>
				<a href="/" target="_blank" rel="noopener norefferer">
					<FaSpotify size={30} />
				</a>
				<a href="/" target="_blank" rel="noopener norefferer">
					<FaYoutube size={30} />
				</a>
				<a href="/" target="_blank" rel="noopener norefferer">
					<AiFillInstagram size={30} />
				</a>
			</div>
		</div>
	);
}
