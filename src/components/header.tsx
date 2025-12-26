import Image from "next/image";
import GroupLogoIcon from "../public/GroupLogoIcon.svg";
import { FaSpotify, FaTwitter, FaYoutube } from "react-icons/fa";
import Link from "next/link";
import { AiFillInstagram } from "react-icons/ai";
import WaweIcon1 from "../public/WaweIcon1.svg";

export function Header() {
	return (
		<div className="flex justify-between px-12 py-6 max-w-480 mx-auto">
			<div className="flex gap-15 text-2xl items-center">
				<Link href="/" className="hover:opacity-80 transition-opacity">
					Main
				</Link>
				<Link href="/event" className="hover:opacity-80 transition-opacity">
					Event
				</Link>
				<Link
					className="flex gap-2 items-center hover:opacity-80 transition-opacity"
					href="/album"
				>
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
			<Link href="/" className="hover:opacity-80 transition-opacity">
				<Image src={GroupLogoIcon} alt="Group Logo" width={121} height={61} />
			</Link>
			<div className="flex gap-5 items-center">
				<a
					href="https://x.com/ArcticMonkeys"
					target="_blank"
					rel="noopener norefferer"
					className="hover:opacity-80 transition-opacity"
				>
					<FaTwitter size={30} />
				</a>
				<a
					href="https://open.spotify.com/artist/7Ln80lUS6He07XvHI8qqHH"
					target="_blank"
					rel="noopener norefferer"
					className="hover:opacity-80 transition-opacity"
				>
					<FaSpotify size={30} />
				</a>
				<a
					href="https://www.youtube.com/channel/UC-KTRBl9_6AX10-Y7IKwKdw"
					target="_blank"
					rel="noopener norefferer"
					className="hover:opacity-80 transition-opacity"
				>
					<FaYoutube size={30} />
				</a>
				<a
					href="https://www.instagram.com/arcticmonkeys"
					target="_blank"
					rel="noopener norefferer"
					className="hover:opacity-80 transition-opacity"
				>
					<AiFillInstagram size={30} />
				</a>
			</div>
		</div>
	);
}
