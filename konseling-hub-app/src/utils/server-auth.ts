"use server";

import AccountRole from "./types/account-role";

import { cookies } from "next/headers";

import { jwtDecode } from "jwt-decode";

export interface AuthData {
	username: string;
	profilePicture: null | string;
	fullname: string;
	role: AccountRole;
}

export interface DecodedAccessTokenPayload extends AuthData {
	username: "346c0860b82209a9a728e62ca45ad52a";
	profilePicture: null;
	fullname: "Refarwan";
	role: "konseli";
	iat: number;
	exp: number;
}

export const getAuthData = async (): Promise<null | AuthData> => {
	const accessToken = (await cookies()).get("accessToken");
	if (!accessToken) return null;
	const authData: DecodedAccessTokenPayload = jwtDecode(accessToken.value);
	return {
		username: authData.username,
		profilePicture: authData.profilePicture,
		fullname: authData.fullname,
		role: authData.role,
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
