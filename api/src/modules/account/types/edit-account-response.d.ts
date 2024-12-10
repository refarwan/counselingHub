type ReAuthenicateAccessToken = {
	reAuthenticate: "accessToken";
	accessToken: string;
};

export type EditAccountResponse =
	| ReAuthenicateAccessToken
	| { reAuthenticate: false | "all" };
