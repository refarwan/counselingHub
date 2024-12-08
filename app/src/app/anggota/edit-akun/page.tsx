"use client";

import { useAxiosErrorHandling } from "@/app/components/AxiosErrorHandling";
import TextField from "@/app/components/Textfiled";
import SelectField from "@/app/components/Selectfiled";
import TemplateMain from "../components/TemplateMain";
import { axiosInstanceWithToken } from "@/utils/axios-intance";
import LoadingPage from "../components/LoadingPage";

import { useEffect, useState } from "react";

import { FaCircleUser } from "react-icons/fa6";
import { AxiosError } from "axios";

type AccountData = {
	profilePicture: null | string;
	username: string;
	email: string;
	phoneNumber: null | string;
	fullname: string;
	birthday: null | string;
	gender: "male" | "female";
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

const Page = () => {
	const [accountData, setAccountData] = useState<undefined | AccountData>(
		undefined
	);

	const { axiosErrorHandling } = useAxiosErrorHandling();
	useEffect(() => {
		axiosInstanceWithToken("/account/my-profile")
			.then((response) => {
				const responseData: AccountData = response.data;
				setAccountData(responseData);
			})
			.catch((error: AxiosError) => {
				axiosErrorHandling({ error });
			});
	}, [axiosErrorHandling]);

	return accountData === undefined ? (
		<LoadingPage />
	) : (
		<TemplateMain className="px-[16px] py-[16px] flex flex-col gap-[16px]">
			<form className="flex flex-col gap-[16px] sm:w-[600px] sm:mx-auto">
				<div className="flex flex-col gap-[8px] justify-center items-center">
					<FaCircleUser size={150} className="fill-slate-400" />
					<button className="filled-button">Ubah Foto</button>
				</div>
				<TextField type="text" label="Username" name="username" />
				<TextField type="email" label="Email" name="email" />
				<TextField label="Nomor Telepon" />
				<TextField label="Nama Lengkap" type="text" name="fullname" />
				<div className="flex flex-col gap-[16px] sm:flex-row sm:gap-[48px]">
					<div className="flex gap-[16px]">
						<TextField type="number" label="Tgl" className="w-[61px]" />
						<SelectField
							name="month"
							label="Bulan"
							options={[
								{ value: "1", text: "Januari" },
								{ value: "2", text: "Februari" },
								{ value: "3", text: "Maret" },
								{ value: "4", text: "April" },
								{ value: "5", text: "Mei" },
								{ value: "6", text: "Juni" },
								{ value: "7", text: "Juli" },
								{ value: "8", text: "Agustus" },
								{ value: "9", text: "September" },
								{ value: "10", text: "Oktober" },
								{ value: "11", text: "November" },
								{ value: "12", text: "Desember" },
							]}
							className="flex-1"
						/>
						<TextField label="Tahun" className="w-[95px]" />
					</div>

					<SelectField
						name="gender"
						label="Jenis Kelamin"
						options={[
							{ value: "male", text: "Laki-laki" },
							{ value: "female", text: "Perempuan" },
						]}
						className="sm:flex-1"
					/>
				</div>
				<TextField label="Alamat" />
				<div className="flex flex-col gap-[16px] sm:flex-row">
					<SelectField
						className="sm:w-full"
						name="gender"
						label="Kabupaten / kota"
						options={[]}
					/>
					<SelectField
						className="sm:w-full"
						name="gender"
						label="Provinsi"
						options={[]}
					/>
				</div>
				<div className="flex flex-col gap-[16px] sm:flex-row">
					<TextField className="sm:w-full" label="Pendidikan" />
					<TextField className="sm:w-full" label="Profesi" />
				</div>
				<button type="submit" className="filled-button w-max ml-auto">
					Simpan
				</button>
			</form>
		</TemplateMain>
	);
};

export default Page;
