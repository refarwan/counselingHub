"use client";

import Button from "@/components/Button";
import TextField from "@/components/Textfiled";
import Link from "next/link";

import { useState } from "react";
import { MdHeadphones } from "react-icons/md";

const Page = () => {
	const [email, setEmail] = useState<string>("");

	return (
		<>
			<main className="px-[16px] pt-[56px]">
				<div className="flex flex-col gap-[16px] sm:w-[332px] xl:w-[428px] m-auto">
					<div className="text-sky-600 flex flex-col gap-[16px] items-center">
						<MdHeadphones size={48} />
						<span className="text-[30px]">
							<span className="font-bold">Teman</span>Dengar
						</span>
					</div>
					<div className="flex gap-[5px] flex-col">
						<h1 className="font-semibold text-[30px]">Masuk</h1>
						<p>Masuk dan gunakan akun kamu</p>
					</div>
					<TextField
						label="Email atau nomor telepon"
						setStateAction={setEmail}
						name="email"
					/>
					<TextField
						label="Kata sandi"
						setStateAction={setEmail}
						name="password"
					/>
					<Link href={"/lupa-sandi"} className="text-sky-600">
						Lupa Sandi?
					</Link>
					<div className="flex justify-end gap-[16px]">
						<Button type="text">Daftar</Button>
						<Button>Masuk</Button>
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
