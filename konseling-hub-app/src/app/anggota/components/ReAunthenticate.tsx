"use client";

import { useCallback, useEffect } from "react";

import { axiosInstance } from "@/utils/axios-intance";
import {
	checkIsLogin,
	getAccessToken,
	setAccessToken,
} from "@/utils/server-auth";
import { useAxiosErrorHandlingContext } from "@/app/components/AxiosErrorHandlingContext";

import { AxiosError } from "axios";
import { FaSpinner } from "react-icons/fa6";
import { BsPuzzleFill } from "react-icons/bs";

const ReAuthenticate = () => {
	const { axiosErrorHandling } = useAxiosErrorHandlingContext();
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
						axiosErrorHandling(error);
					});
		}
	}, [axiosErrorHandling]);

	useEffect(() => {
		reAuthenticate();
	}, [reAuthenticate]);

	return (
		<main className="w-screen h-screen px-[24px] flex gap-[8px] flex-col items-center justify-center">
			<div className="text-sky-500 flex flex-col items-center">
				<BsPuzzleFill size={80} />
				<span className="text-[50px]">
					Konseling<span className="font-bold">HUB</span>
				</span>
			</div>
			<FaSpinner size={30} className="animate-spin fill-sky-500" />
		</main>
	);
};

export default ReAuthenticate;
