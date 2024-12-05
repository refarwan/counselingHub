"use client";

import { useAxiosErrorHandling } from "@/app/components/AxiosErrorHandling";
import TemplateMain from "../components/TemplateMain";
import { axiosInstanceWithToken } from "@/utils/axios-intance";
import LoadingPage from "../components/LoadingPage";
import { getAuthData } from "@/utils/server-auth";

import { useCallback, useEffect, useState } from "react";

import { FaCircleUser } from "react-icons/fa6";
import { AxiosError } from "axios";
import { DateTime } from "luxon";

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
	const [authData, setAuthData] = useState<undefined | string>(undefined);

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

	const loadAuthData = useCallback(async () => {
		const tempAuthData = await getAuthData();
		if (tempAuthData) setAuthData(tempAuthData.role);
	}, []);

	useEffect(() => {
		loadAuthData();
	}, [loadAuthData]);

	return accountData === undefined || authData === undefined ? (
		<LoadingPage />
	) : (
		<TemplateMain>
			<div className="flex flex-col gap-[16px] px-[24px] py-[16px] m-auto sm:w-[650px] sm:px-0">
				<div className="flex flex-col gap-[2px] justify-center items-center">
					<FaCircleUser size={150} className="fill-slate-400" />
					<div className="font-semibold text-[20px]">
						{accountData.fullname}
					</div>
					<div className="bg-sky-500 text-white px-[8px] rounded-[4px] w-max">
						{authData.charAt(0).toUpperCase() + authData.slice(1)}
					</div>
				</div>
				<div className="flex flex-col px-[16px] border border-slate-200 rounded-[4px]">
					<div className="pt-[8px]">
						<h2 className="font-semibold">Akun</h2>
					</div>
					<div className="border-b border-b-slate-200 py-[8px] sm:flex sm:items-center">
						<div className="text-slate-400 text-[12px] w-[150px]">Username</div>
						<div>{accountData.username}</div>
					</div>
					<div className="border-b border-b-slate-200 py-[8px] sm:flex sm:items-center">
						<div className="text-slate-400 text-[12px] w-[150px]">Email</div>
						<div>{accountData.email}</div>
					</div>
					<div className="py-[8px] sm:flex sm:items-center">
						<div className="text-slate-400 text-[12px] w-[150px]">
							Nomor Telepon
						</div>
						<div>{accountData.phoneNumber ?? "-"}</div>
					</div>
				</div>

				<div className="flex flex-col px-[16px] border border-slate-200 rounded-[4px]">
					<div className="pt-[8px]">
						<h2 className="font-semibold">Data Pribadi</h2>
					</div>
					<div className="border-b border-b-slate-200 py-[8px] sm:flex sm:items-center">
						<div className="text-slate-400 text-[12px] w-[150px]">
							Tanggal Lahir
						</div>
						<div>
							{accountData.birthday
								? DateTime.fromISO(accountData.birthday)
										.setLocale("id")
										.toFormat("dd MMMM yyyy")
								: "-"}
						</div>
					</div>
					<div className="border-b border-b-slate-200 py-[8px] sm:flex sm:items-center">
						<div className="text-slate-400 text-[12px] w-[150px]">
							Jenis Kelamin
						</div>
						<div>
							{accountData.gender
								? accountData.gender === "male"
									? "Laki-laki"
									: "Perempuan"
								: "-"}
						</div>
					</div>
					<div className="border-b border-slate-200 py-[8px] sm:flex sm:items-center">
						<div className="text-slate-400 text-[12px] w-[150px]">Alamat</div>
						<div>{accountData.address ?? "-"}</div>
					</div>
					<div className="border-b border-slate-200 py-[8px] sm:flex sm:items-center">
						<div className="text-slate-400 text-[12px] w-[150px]">Kota</div>
						<div>{accountData.regency ? accountData.regency.name : "-"}</div>
					</div>
					<div className="border-b border-slate-200 py-[8px] sm:flex sm:items-center">
						<div className="text-slate-400 text-[12px] w-[150px]">Provinsi</div>
						<div>{accountData.province ? accountData.province.name : "-"}</div>
					</div>
					<div className="border-b border-slate-200 py-[8px] sm:flex sm:items-center">
						<div className="text-slate-400 text-[12px] w-[150px]">
							Pendidikan
						</div>
						<div>{accountData.education ?? "-"}</div>
					</div>
					<div className="py-[8px] sm:flex sm:items-center">
						<div className="text-slate-400 text-[12px] w-[150px]">Profesi</div>
						<div>{accountData.profession ?? "-"}</div>
					</div>
				</div>
			</div>
		</TemplateMain>
	);
};

export default Page;
