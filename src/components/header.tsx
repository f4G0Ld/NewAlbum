import Image from "next/image";
import GroupLogoIcon from "../public/GroupLogoIcon.svg";
import { FaSpotify, FaTwitter, FaYoutube } from "react-icons/fa";
import Link from "next/link";
import { AiFillInstagram } from "react-icons/ai";

export function Header() {
	return (
		<div className="flex justify-between p-8">
			<div className="flex gap-15 text-2xl">
				<Link href="/">Store</Link>
				<Link href="/">Live</Link>
				<Link href="/">Videos</Link>
				<Link href="/">New album</Link>
			</div>
			<Image src={GroupLogoIcon} alt="Group Logo" width={121} height={61} />
			<div className="flex gap-5 ">
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
