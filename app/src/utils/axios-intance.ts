"use client";

import { getAccessToken, setAccessToken } from "./server-auth";

import axios, { AxiosError } from "axios";
import { jwtDecode } from "jwt-decode";

const axiosInstance = axios.create({
	baseURL: "/data",
});

const axiosInstanceWithToken = axios.create({
	baseURL: "/data",
});

axiosInstance.defaults.withCredentials = true;

axiosInstanceWithToken.defaults.withCredentials = true;
axiosInstanceWithToken.interceptors.request.use(async (config) => {
	let accessToken = await getAccessToken();

	if (!accessToken) return Promise.reject({ message: "Token tidak ditemukan" });

	type DecodedAccessTokenPayload = {
		username: string;
		role: "member" | "admin" | "master";
		status: "uncompleted" | "non active" | "active";
		iat: number;
		exp: number;
	};

	const data: DecodedAccessTokenPayload = jwtDecode(accessToken);
	if (data.exp * 1000 - 5 < new Date().getTime()) {
		await axiosInstance
			.get("/auth/access-token")
			.then(async (response) => {
				accessToken = response.data.accessToken;
				await setAccessToken(response.data.accessToken);
			})
			.catch(async (error: AxiosError) => {
				return Promise.reject(error);
			});
	}

	config.headers.Authorization = "Bearer " + accessToken;
	return config;
});

export { axiosInstance, axiosInstanceWithToken };
