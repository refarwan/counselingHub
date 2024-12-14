export type AccountRole = "konseli" | "konselor" | "administrator";

export interface AuthData {
	username: string;
	profilePicture: null | {
		small: string;
		medium: string;
		large: string;
	};
	fullname: string;
	role: AccountRole;
}

export interface DecodedAccessTokenPayload extends AuthData {
	iat: number;
	exp: number;
}
