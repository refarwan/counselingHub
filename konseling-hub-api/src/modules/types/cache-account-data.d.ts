import { Role } from "@prisma/client";

export type CacheAccountDataType = {
	id: number;
	profilePicture: null | string;
	fullname: string;
	role: Role;
};
