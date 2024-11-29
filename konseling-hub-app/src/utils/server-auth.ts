"use server";

import { cookies } from "next/headers";

import { jwtDecode } from "jwt-decode";

export type AccountStatus = "uncompleted" | "non active" | "active";

export interface AuthData {
	role: "member" | "admin" | "master";
	status: AccountStatus;
}

export interface DecodedAccessTokenPayload extends AuthData {
	username: string;
	iat: number;
	exp: number;
}

export const getAuthData = async (): Promise<null | AuthData> => {
	const accessToken = (await cookies()).get("accessToken");
	if (!accessToken) return null;
	const authData: DecodedAccessTokenPayload = jwtDecode(accessToken.value);
	return {
		role: authData.role,
		status: authData.status,
	};
};

let secure: boolean = false;

if (process.env.IS_HTTPS) {
	try {
		const isHTTPS = JSON.parse(process.env.IS_HTTPS);
		if (typeof isHTTPS === "boolean") secure = isHTTPS;
	} catch {}
}

export const setAccessToken = async (token: string) => {
	(await cookies()).set("accessToken", token, {
		httpOnly: true,
		sameSite: "strict",
		secure,
	});
};

export const checkIsLogin = async (): Promise<boolean> => {
	const accessToken = (await cookies()).get("refreshToken");
	return accessToken ? true : false;
};

export const deleteAccessToken = async (): Promise<void> => {
	(await cookies()).delete("accessToken");
};

export const getAccessToken = async (): Promise<undefined | string> => {
	return (await cookies()).get("accessToken")?.value;
};
