import { Gender } from "@prisma/client";

type AccountData = {
	profilePicture: null | {
		small: string;
		medium: string;
		large: string;
	};
	username: string;
	email: string;
	phoneNumber: null | string;
	fullname: string;
	birthday: null | string;
	gender: Gender;
	address: null | string;
	regency: null | {
		id: number;
		name: string;
	};
	province: null | {
		id: number;
		name: string;
	};
	education: null | string;
	profession: null | string;
};

export default AccountData;
