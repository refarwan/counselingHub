"use client";

import TextField from "@/app/components/Textfiled";
import { axiosInstance } from "@/utils/axios-intance";
import { useLoadingBar } from "@/app/components/LoadingBar";
import { useAxiosErrorHandling } from "@/app/components/AxiosErrorHandling";
import { usePopup } from "@/app/components/Popup";

import { FormEvent, useCallback, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { AxiosError } from "axios";
import { BsPuzzleFill } from "react-icons/bs";

const Page = () => {
	const [fullname, setFullname] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [confirmPassword, setconfirmPassword] = useState<string>("");

	type ErrorInput = {
		email?: string[];
		fullname?: string[];
		password?: string[];
		confirmPassword?: string[];
	};

	const [errorInput, setErrorInput] = useState<ErrorInput>({});
	const [isProcessing, setIsProcessing] = useState<boolean>(false);

	const { loadingBarStart, loadingBarStop } = useLoadingBar();
	const { axiosErrorHandling } = useAxiosErrorHandling();
	const { successPopup } = usePopup();
	const router = useRouter();

	const register = useCallback(
		async (event: FormEvent) => {
			event.preventDefault();
			const errorInputTemp: ErrorInput = {};
			if (!fullname)
				errorInputTemp.fullname = ["Nama lengkap tidak boleh kosong"];
			if (!email) errorInputTemp.email = ["Email tidak boleh kosong"];
			if (!password) errorInputTemp.password = ["Sandi tidak boleh kosong"];
			if (!confirmPassword)
				errorInputTemp.confirmPassword = [
					"Konfirmasi password tidak boleh kosong",
				];
			else if (password !== confirmPassword)
				errorInputTemp.confirmPassword = ["Konfirmasi password tidak sama"];

			if (Object.keys(errorInputTemp).length)
				return setErrorInput(errorInputTemp);

			setIsProcessing(true);
			loadingBarStart();

			await axiosInstance
				.post("account/register", {
					fullname,
					email,
					password,
					confirmPassword,
				})
				.then((response) => {
					successPopup(response.data.message, () => {
						router.push("/masuk");
					});
					setFullname("");
					setEmail("");
					setPassword("");
					setconfirmPassword("");
				})
				.catch((error: AxiosError) => {
					axiosErrorHandling({ error, setStateAction: setErrorInput });
				});

			loadingBarStop();
			setIsProcessing(false);
		},
		[
			axiosErrorHandling,
			confirmPassword,
			email,
			fullname,
			loadingBarStart,
			loadingBarStop,
			password,
			successPopup,
			router,
		]
	);

	const deleteErrorInput = (
		name: "email" | "fullname" | "password" | "confirmPassword"
	) => {
		const data = { ...errorInput };
		delete data[name];
		setErrorInput(data);
	};

	return (
		<>
			<main className="px-[16px] pt-[56px]">
				<form
					className="flex flex-col gap-[16px] sm:w-[332px] xl:w-[428px] m-auto"
					onSubmit={register}
				>
					<div className="text-sky-500 flex flex-col items-center">
						<BsPuzzleFill size={48} />
						<span className="text-[30px]">
							Counseling<span className="font-bold">Hub</span>
						</span>
					</div>
					<div className="flex gap-[5px] flex-col">
						<h1 className="font-semibold text-[30px]">Daftar</h1>
						<p>Buat akunmu sekarang</p>
					</div>
					<TextField
						type="text"
						name="fullname"
						label="Nama lengkap"
						isError={errorInput.fullname?.length ? true : false}
						setStateAction={setFullname}
						supporting={errorInput.fullname}
						onChange={() => deleteErrorInput("fullname")}
						value={fullname}
						disabled={isProcessing}
					/>
					<TextField
						type="email"
						name="email"
						label="Email"
						isError={errorInput.email?.length ? true : false}
						setStateAction={setEmail}
						supporting={errorInput.email}
						onChange={() => deleteErrorInput("email")}
						value={email}
						disabled={isProcessing}
					/>
					<TextField
						type="password"
						name="password"
						label="Sandi"
						isError={errorInput.password?.length ? true : false}
						setStateAction={setPassword}
						supporting={errorInput.password}
						onChange={() => deleteErrorInput("password")}
						value={password}
						disabled={isProcessing}
					/>
					<TextField
						type="password"
						name="confirmPassword"
						label="Konfirmasi"
						isError={errorInput.confirmPassword?.length ? true : false}
						setStateAction={setconfirmPassword}
						supporting={errorInput.confirmPassword}
						onChange={() => deleteErrorInput("confirmPassword")}
						value={confirmPassword}
						disabled={isProcessing}
					/>
					<span className="text-[12px]">
						Dengan mendaftar, saya menyetujui{" "}
						<Link href={"/syarat-dan-ketentuan"} className="text-sky-500">
							Syarat & Ketentuan
						</Link>{" "}
						serta{" "}
						<Link href={"/kebijakan-privasi"} className="text-sky-500">
							Kebijakan Privasi
						</Link>
					</span>

					<div>
						<button
							type="submit"
							className="filled-button ml-auto block"
							disabled={isProcessing}
						>
							Daftar
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
