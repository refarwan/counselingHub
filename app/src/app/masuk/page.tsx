"use client";

import TextField from "@/app/components/Textfiled";

import { FormEvent, useCallback, useState } from "react";

import Link from "next/link";

import { BsPuzzleFill } from "react-icons/bs";
import { useLoadingBarContext } from "@/app/components/LoadingBar";
import { useRouter } from "next/navigation";
import { useAxiosErrorHandlingContext } from "@/app/components/AxiosErrorHandling";
import { axiosInstance } from "@/utils/axios-intance";
import { setAccessToken } from "@/utils/server-auth";
import { AxiosError } from "axios";

const Page = () => {
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	type errorInputType = {
		username?: string[];
		password?: string[];
	};

	const [errorInputState, setErrorInputState] = useState<errorInputType>({});

	const deleteErrorInput = (name: "password" | "username") => {
		const data = { ...errorInputState };
		delete data[name];
		setErrorInputState(data);
	};

	const loadingBar = useLoadingBarContext();
	const [isProcessing, setIsProcessing] = useState<boolean>(false);
	const router = useRouter();
	const axiosErrorHandling = useAxiosErrorHandlingContext();

	const login = useCallback(
		async (event: FormEvent) => {
			event.preventDefault();

			const inputErrors: errorInputType = { ...errorInputState };

			if (!username) inputErrors.username = ["Username tidak boleh kosong"];
			if (!password) inputErrors.password = ["Password tidak boleh kosong"];

			console.log(inputErrors);

			if (Object.keys(inputErrors).length)
				return setErrorInputState(inputErrors);

			loadingBar.start();
			setIsProcessing(true);
			await axiosInstance
				.post("auth/login", {
					username,
					password,
				})
				.then(async (response) => {
					await setAccessToken(response.data.accessToken);
					router.push("/anggota/dashboard");
				})
				.catch((error: AxiosError) => {
					axiosErrorHandling({ error, setStateAction: setErrorInputState });
				});
			setIsProcessing(false);
			loadingBar.stop();
		},
		[
			axiosErrorHandling,
			errorInputState,
			loadingBar,
			password,
			router,
			username,
		]
	);

	return (
		<>
			<main className="px-[16px] pt-[56px]">
				<form
					className="flex flex-col gap-[16px] sm:w-[332px] xl:w-[428px] m-auto"
					onSubmit={login}
					method="post"
				>
					<div className="text-sky-500 flex flex-col items-center">
						<BsPuzzleFill size={48} />
						<span className="text-[30px]">
							Counseling<span className="font-bold">Hub</span>
						</span>
					</div>
					<div className="flex gap-[5px] flex-col">
						<h1 className="font-semibold text-[30px]">Masuk</h1>
						<p>Masuk dan gunakan akun kamu</p>
					</div>
					<TextField
						type="text"
						name="username"
						label="Username / email / nomor telepon"
						setStateAction={setUsername}
						onChange={() => {
							deleteErrorInput("username");
						}}
						isError={errorInputState.username ? true : false}
						supporting={errorInputState.username}
					/>
					<TextField
						type="password"
						name="password"
						label="Kata sandi"
						setStateAction={setPassword}
						onChange={() => {
							deleteErrorInput("password");
						}}
						isError={errorInputState.password ? true : false}
						supporting={errorInputState.password}
					/>
					<Link href={"/lupa-sandi"} className="w-max text-sky-500">
						Lupa Sandi?
					</Link>
					<div className="flex justify-end gap-[16px]">
						<Link href={"/daftar"} className="text-button">
							Daftar
						</Link>
						<button
							type="submit"
							className="filled-button"
							disabled={isProcessing}
						>
							Masuk
						</button>
					</div>
				</form>
			</main>
			<footer className="text-[12px] text-center mt-[56px] mb-[5px]">
				Copyright &copy; Tessera Indonesia 2024
			</footer>
		</>
	);
};

export default Page;
