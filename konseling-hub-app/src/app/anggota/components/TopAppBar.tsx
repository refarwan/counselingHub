"use client";

import AccountRole from "@/utils/types/account-role";
import { useLoadingBarContext } from "@/app/components/LoadingBarContext";
import { deleteAccessToken } from "@/utils/server-auth";
import { axiosInstance } from "@/utils/axios-intance";
import { useAxiosErrorHandlingContext } from "@/app/components/AxiosErrorHandlingContext";

import { MouseEvent, ReactNode, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import {
	FaBars,
	FaAddressCard,
	FaUserGear,
	FaKey,
	FaRightFromBracket,
	FaCircleUser,
} from "react-icons/fa6";
import { BsPuzzleFill } from "react-icons/bs";
import { AxiosError } from "axios";

const TopAppBar = ({
	togleMenu,
	children,
	accountData,
}: {
	togleMenu?: () => void;
	children?: ReactNode;
	accountData: {
		profilePicture: null | string;
		fullname: string;
		role: AccountRole;
	};
}) => {
	const [showMenu, setSHowMenu] = useState<boolean>(false);

	const { loadingBarStart, loadingBarStop } = useLoadingBarContext();
	const router = useRouter();
	const { axiosErrorHandling } = useAxiosErrorHandlingContext();

	const logout = async (event: MouseEvent) => {
		event.preventDefault();
		loadingBarStart();
		await axiosInstance
			.delete("auth/logout")
			.catch((error: AxiosError) => axiosErrorHandling(error));
		deleteAccessToken();
		loadingBarStop();
		router.push("/masuk");
	};

	return (
		<>
			<header className="bg-white border-b border-b-slate-200 w-full h-[64px] flex justify-between items-center gap-[16px] px-[8px] sm:px-[16px] fixed top-0 left-0">
				<button
					className="w-[40px] h-[40px] grid place-content-center"
					onClick={() => {
						if (togleMenu) togleMenu();
					}}
				>
					<FaBars size={24} />
				</button>
				<div className="flex-1 flex items-center">
					<Link href={"/"} className="w-max text-sky-500 flex items-center">
						{" "}
						<BsPuzzleFill size={24} />
						<span>
							Konseling
							<span className="font-bold">HUB</span>
						</span>
					</Link>
					{children ? <div>{children}</div> : null}
				</div>
				<button
					className="w-[40px] h-[40px] grid place-content-center"
					onClick={() => {
						setSHowMenu((prev) => !prev);
					}}
				>
					<FaCircleUser className="fill-slate-400" size={30} />
				</button>
				<div
					className={
						"bg-white shadow w-[280px] absolute top-[52px] right-[8px] sm:right-[16px] rounded-[4px] overflow-hidden duration-75 " +
						(showMenu ? "h-[265px] pb-[8px]" : "h-0 pb-0")
					}
				>
					<Link
						href={"/"}
						className="flex px-[12px] py-[8px] gap-[12px] border-b border-slate-200 base-link"
					>
						<FaCircleUser className="fill-slate-400" size={40} />
						<div>
							<span>{accountData.fullname}</span>
							<div className="bg-sky-500 text-white w-max px-[8px] rounded-[4px]">
								{accountData.role.charAt(0).toUpperCase() +
									accountData.role.slice(1)}
							</div>
						</div>
					</Link>
					<div>
						<Link
							href={"/"}
							className="flex px-[12px] gap-[12px] h-[48px] base-link items-center"
						>
							<FaAddressCard size={24} /> <span>Edit Data Diri</span>
						</Link>
						<Link
							href={"/"}
							className="flex px-[12px] gap-[12px] h-[48px] base-link items-center"
						>
							<FaUserGear size={24} /> <span>Edit Akun</span>
						</Link>
						<Link
							href={"/"}
							className="flex px-[12px] gap-[12px] h-[48px] base-link items-center"
						>
							<FaKey size={24} /> <span>Ubah Password</span>
						</Link>
						<a
							href="/logout"
							className="flex px-[12px] gap-[12px] h-[48px] base-link items-center"
							onClick={logout}
						>
							<FaRightFromBracket size={24} /> <span>Keluar</span>
						</a>
					</div>
				</div>
			</header>
		</>
	);
};

export default TopAppBar;
