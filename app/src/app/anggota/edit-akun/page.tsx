"use client";

import { useAxiosErrorHandling } from "@/app/components/AxiosErrorHandling";
import TextField from "@/app/components/Textfiled";
import SelectField from "@/app/components/Selectfiled";
import TemplateMain from "../components/TemplateMain";
import { axiosInstanceWithToken } from "@/utils/axios-intance";
import LoadingPage from "../components/LoadingPage";

import { FormEvent, useCallback, useEffect, useState } from "react";

import { FaCircleUser } from "react-icons/fa6";
import { AxiosError } from "axios";
import { DateTime } from "luxon";
import Image from "next/image";

interface RegencyData {
	id: number;
	name: string;
}

interface ProvinceData extends RegencyData {
	Regency: RegencyData[];
}

type AccountData = {
	profilePicture: null | { small: string; medium: string; large: string };
	username: string;
	email: string;
	phoneNumber: null | string;
	fullname: string;
	birthday: null | string;
	gender: "male" | "female" | null;
	address: null | string;
	regency: null | RegencyData;
	province: null | RegencyData;
	education: null | string;
	profession: null | string;
};

const Page = () => {
	const [provinceData, setProvinceData] = useState<ProvinceData[] | undefined>(
		undefined
	);
	const [accountDataReady, setAccountDataReady] = useState<boolean>(false);
	const { axiosErrorHandling } = useAxiosErrorHandling();

	const [currentProfilePicture, setCurrentProfilePicture] = useState<
		null | string
	>(null);
	const [username, setUsername] = useState<undefined | string>(undefined);
	const [email, setEmail] = useState<undefined | string>(undefined);
	const [phoneNumber, setPhoneNumber] = useState<undefined | string>(undefined);
	const [fullname, setFullname] = useState<undefined | string>(undefined);
	const [day, setDay] = useState<undefined | string>(undefined);
	const [month, setMonth] = useState<undefined | string>(undefined);
	const [year, setYear] = useState<undefined | string>(undefined);
	const [gender, setGender] = useState<undefined | string>(undefined);
	const [address, setAddress] = useState<undefined | string>(undefined);
	const [education, setEducation] = useState<undefined | string>(undefined);
	const [profession, setProfession] = useState<undefined | string>(undefined);

	const [selectedProvince, setSelectedProvince] = useState<
		undefined | ProvinceData
	>(undefined);
	const [regencyActive, setRegencyActive] = useState<RegencyData[]>([]);
	const [regency, setRegency] = useState<undefined | number | string>(
		undefined
	);

	useEffect(() => {
		axiosInstanceWithToken("/account/all-province")
			.then((response) => {
				const provinceData = response.data as ProvinceData[];
				setProvinceData(provinceData);
			})
			.catch((error: AxiosError) => {
				axiosErrorHandling({ error });
			});
	}, [axiosErrorHandling]);

	const selectProvince = useCallback(
		(id: number) => {
			const province = provinceData?.find((item) => item.id === id);
			setSelectedProvince(province);
			if (province) setRegencyActive(province.Regency);
		},
		[provinceData]
	);

	useEffect(() => {
		if (provinceData)
			axiosInstanceWithToken("/account/my-profile")
				.then((response) => {
					const accountData: AccountData = response.data;
					setAccountDataReady(true);

					setCurrentProfilePicture(
						accountData.profilePicture ? accountData.profilePicture.large : null
					);
					setUsername(accountData.username);
					setEmail(accountData.email);
					setFullname(accountData.fullname);
					if (accountData.phoneNumber) setPhoneNumber(accountData.phoneNumber);
					if (accountData.birthday)
						setDay(String(DateTime.fromISO(accountData.birthday).day));
					if (accountData.birthday)
						setMonth(String(DateTime.fromISO(accountData.birthday).month));
					if (accountData.birthday)
						setYear(String(DateTime.fromISO(accountData.birthday).year));
					if (accountData.gender) setGender(accountData.gender);
					if (accountData.address) setAddress(accountData.address);
					if (accountData.education) setEducation(accountData.education);
					if (accountData.profession) setProfession(accountData.profession);

					if (accountData.province) selectProvince(accountData.province.id);
					if (accountData.regency) setRegency(accountData.regency.id);
				})
				.catch((error: AxiosError) => {
					axiosErrorHandling({ error });
				});
	}, [axiosErrorHandling, provinceData, selectProvince]);

	const save = (event: FormEvent) => {
		event.preventDefault();
	};

	return !accountDataReady || provinceData === undefined ? (
		<LoadingPage />
	) : (
		<TemplateMain className="px-[16px] py-[16px] flex flex-col gap-[16px]">
			<form
				className="flex flex-col gap-[16px] sm:w-[600px] sm:mx-auto"
				onSubmit={save}
			>
				<div className="flex flex-col gap-[8px] justify-center items-center">
					{currentProfilePicture ? (
						<Image
							src={currentProfilePicture}
							alt="Profile Picture"
							width={150}
							height={150}
							className="w-[150px] h-[150px] rounded-full"
						/>
					) : (
						<FaCircleUser size={150} className="fill-slate-400" />
					)}
					<button className=" filled-button">Ubah Foto</button>
				</div>
				<TextField
					type="text"
					label="Username"
					name="username"
					value={username}
					onChange={(event) => setUsername(event.target.value)}
				/>
				<TextField
					type="email"
					label="Email"
					name="email"
					value={email}
					onChange={(event) => setEmail(event.target.value)}
				/>
				<TextField
					label="Nomor Telepon"
					name="phoneNumber"
					value={phoneNumber}
					onChange={(event) => setPhoneNumber(event.target.value)}
				/>
				<TextField
					label="Nama Lengkap"
					type="text"
					name="fullname"
					value={fullname}
					onChange={(event) => setFullname(event.target.value)}
				/>
				<div className="flex flex-col gap-[16px] sm:flex-row sm:gap-[48px]">
					<div className="flex gap-[16px]">
						<TextField
							type="text"
							label="Tgl"
							className="w-[61px]"
							name="day"
							value={day}
							onChange={(event) => setDay(event.target.value)}
							maxLength={2}
							minLength={1}
						/>
						<SelectField
							name="month"
							label="Bulan"
							value={month}
							onChange={(event) => setMonth(event.target.value)}
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
						<TextField
							label="Tahun"
							className="w-[95px]"
							name="year"
							minLength={1}
							maxLength={4}
							value={year}
							onChange={(event) => setYear(event.target.value)}
						/>
					</div>

					<SelectField
						name="gender"
						label="Jenis Kelamin"
						options={[
							{ value: "male", text: "Laki-laki" },
							{ value: "female", text: "Perempuan" },
						]}
						className="sm:flex-1"
						value={gender}
						onChange={(event) => setGender(event.target.value)}
					/>
				</div>
				<TextField
					label="Alamat"
					name="address"
					value={address}
					onChange={(event) => setAddress(event.target.value)}
				/>
				<div className="flex flex-col gap-[16px] sm:flex-row">
					<SelectField
						className="sm:w-full"
						name="gender"
						label="Provinsi"
						value={selectedProvince?.id}
						onChange={(event) => selectProvince(parseInt(event.target.value))}
						options={provinceData.map((item) => ({
							value: item.id,
							text: item.name,
						}))}
					/>
					<SelectField
						className="sm:w-full"
						name="gender"
						label="Kabupaten / kota"
						disabled={selectedProvince ? false : true}
						value={regency}
						onChange={(event) => setRegency(event.target.value)}
						options={regencyActive.map((item) => ({
							value: item.id,
							text: item.name,
						}))}
					/>
				</div>
				<div className="flex flex-col gap-[16px] sm:flex-row">
					<TextField
						className="sm:w-full"
						label="Pendidikan"
						name="education"
						value={education}
						onChange={(event) => setEducation(event.target.value)}
					/>
					<TextField
						className="sm:w-full"
						label="Profesi"
						name="profession"
						value={profession}
						onChange={(event) => setProfession(event.target.value)}
					/>
				</div>
				<button type="submit" className="filled-button w-max ml-auto">
					Simpan
				</button>
			</form>
		</TemplateMain>
	);
};

export default Page;
