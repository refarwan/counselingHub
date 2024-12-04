import { Gender } from "@prisma/client";

type AccountData = {
	profilePicture: null | string;
	username: string;
	email: null | string;
	phone: null | string;
	fullname: string;
	birthday: Date;
	gender: Gender;
	address: null | string;
	city: null | string;
	province: null | string;
	education: null | string;
	profession: null | string;
};

export default AccountData;
