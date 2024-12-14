export type AllProvince = {
	id: number;
	name: string;
	Regency: { id: number; name: string }[];
}[];
