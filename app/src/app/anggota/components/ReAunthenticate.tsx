"use client";

import { axiosInstance } from "@/utils/axios-intance";
import {
	checkIsLogin,
	getAccessToken,
	setAccessToken,
} from "@/utils/server-auth";
import { useAxiosErrorHandling } from "@/app/components/AxiosErrorHandling";

import { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";

import { AxiosError } from "axios";
import { FaSpinner } from "react-icons/fa6";
import { BsPuzzleFill } from "react-icons/bs";

const ReAuthenticate = () => {
	const router = useRouter();

	const { axiosErrorHandling } = useAxiosErrorHandling();
	const reAuthenticate = useCallback(async () => {
		const isLogin = await checkIsLogin();
		if (isLogin) {
			const accessToken = await getAccessToken();
			if (!accessToken)
				await axiosInstance
					.get("/auth/access-token")
					.then(async (response) => {
						await setAccessToken(response.data.accessToken);
					})
					.catch(async (error: AxiosError) => {
						if (error.status === 403)
							return axiosErrorHandling({
								error,
								alertConfirmAction: () => router.push("/masuk"),
							});
						return axiosErrorHandling({ error });
					});
		}
	}, [axiosErrorHandling, router]);

	useEffect(() => {
		reAuthenticate();
	}, [reAuthenticate]);

	return (
		<main className="w-screen h-screen px-[24px] flex gap-[8px] flex-col items-center justify-center">
			<div className="text-sky-500 flex flex-col items-center">
				<BsPuzzleFill size={80} />
				<span className="text-[50px]">
					counseling<span className="font-bold">Hub</span>
				</span>
			</div>
			<FaSpinner size={30} className="animate-spin fill-sky-500" />
		</main>
	);
};

export default ReAuthenticate;
