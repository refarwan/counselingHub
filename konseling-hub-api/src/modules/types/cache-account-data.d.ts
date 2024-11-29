import { Role } from "@prisma/client";

export type CacheAccountDataType = {
	id: number;
	role: Role;
};
