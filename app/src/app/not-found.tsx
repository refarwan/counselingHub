import { Metadata } from "next";
import Link from "next/link";
import { FaFaceFrown } from "react-icons/fa6";

export const metadata: Metadata = {
	title: "Halaman Tidak Ditemukan | Teman Dengar",
	description: "Teman Dengar by Tessera Indonesia",
};

const Page = () => {
	return (
		<main className="w-screen h-screen px-[24px] flex gap-[8px] flex-col items-center justify-center">
			<FaFaceFrown className="fill-sky-500" size={100} />
			<div className="w-full flex flex-col gap-[3px] items-center sm:w-[300px]">
				<h1 className="text-sky-500 font-bold text-[26px]">ERRO 404</h1>
				<p className="text-center">
					Halaman yang kamu cari tidak ditemukan nih
				</p>
			</div>
			<Link href={"/"} className="filled-button">
				Kembali
			</Link>
		</main>
	);
};

export default Page;
