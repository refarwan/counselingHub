import Link from "next/link";
import { FaScrewdriverWrench } from "react-icons/fa6";

export default function Home() {
	return (
		<main className="w-screen h-screen flex flex-col px-[24px] gap-[8px] items-center justify-center">
			<FaScrewdriverWrench size={100} className="fill-sky-500" />
			<div className="sm:w-[500px]">
				<h1 className="text-sky-500 font-semibold text-[26px] text-center">
					Sedang dalam pengembangan
				</h1>
				<p className="text-center">
					Aduh maaf ya halaman, ini masih dalam proses pengembangan :(
				</p>
			</div>
			<Link href={"/anggota"} className="filled-button">
				Dashboard
			</Link>
		</main>
	);
}
