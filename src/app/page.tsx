import Image from "next/image";
import { Header } from "../components/header";
import MainBackground from "../public/MainBackground.svg"

export default function Main() {
	return (
		<div>
			<Header />
			<div className="-z-10 mx-12">
				<Image 
				src={MainBackground}
				alt="!"
				width={1824}
				height={909}
				/>
			</div>
		</div>
	);
}
