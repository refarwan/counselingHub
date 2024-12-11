import { Role } from "@prisma/client";

export type CacheAccountDataType = {
	id: number;
	profilePicture: null | {
		small: string;
		medium: string;
		large: string;
	};
	fullname: string;
	role: Role;
};
