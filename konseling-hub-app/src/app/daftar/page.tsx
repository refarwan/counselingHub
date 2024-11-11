"use client";

import Button from "@/components/Button";
import TextField from "@/components/Textfiled";

import Link from "next/link";

import { FaHeadphones } from "react-icons/fa6";

const Page = () => {
	return (
		<>
			<main className="px-[16px] pt-[56px]">
				<div className="flex flex-col gap-[16px] sm:w-[332px] xl:w-[428px] m-auto">
					<div className="text-sky-600 flex flex-col items-center">
						<FaHeadphones size={48} />
						<span className="text-[30px]">
							<span className="font-bold">Teman</span>Dengar
						</span>
					</div>
					<div className="flex gap-[5px] flex-col">
						<h1 className="font-semibold text-[30px]">Daftar</h1>
						<p>Buat akunmu sekarang</p>
					</div>
					<TextField type="text" name="fullname" label="Nama lengkap" />
					<TextField type="email" name="email" label="Email" />
					<TextField type="password" name="password" label="Sandi" />
					<TextField type="password" name="confirm" label="Konfirmasi" />
					<span className="text-[12px]">
						Dengan mendaftar, saya menyetujui{" "}
						<Link href={"/syarat-dan-ketentuan"} className="text-sky-600">
							Syarat & Ketentuan
						</Link>{" "}
						serta{" "}
						<Link href={"/kebijakan-privasi"} className="text-sky-600">
							Kebijakan Privasi
						</Link>
					</span>

					<div>
						<Button className="ml-auto block">Daftar</Button>
					</div>
				</div>
			</main>
			<footer className="text-[12px] text-center mt-[56px] mb-[5px]">
				Copyright &copy; Teman Dengar 2024
			</footer>
		</>
	);
};

export default Page;
