"use client";

import { useAxiosErrorHandling } from "@/app/components/AxiosErrorHandling";
import { useLoadingBar } from "@/app/components/LoadingBar";
import { axiosInstanceWithToken } from "@/utils/axios-intance";
import { deleteAccessToken } from "@/utils/server-auth";
import { AccountRole } from "@/utils/types/auth-data";

import {
	createContext,
	Dispatch,
	MouseEvent,
	ReactNode,
	SetStateAction,
	useCallback,
	useContext,
	useState,
} from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { AxiosError } from "axios";
import { BsPuzzleFill } from "react-icons/bs";
import {
	FaBars,
	FaCircleUser,
	FaKey,
	FaRightFromBracket,
	FaUserGear,
} from "react-icons/fa6";
import Image from "next/image";

type TopBar = {
	minimizeDesktopNavbar: boolean;
	showMobileNavbar: boolean;
	navbarTogleFunction: () => void;
	setAdditionTopBarComponent: Dispatch<SetStateAction<null | ReactNode>>;
};

const topBarContext = createContext<null | TopBar>(null);

const TopAppBarProvider = ({
	children,
	accountData,
}: {
	children: ReactNode;
	accountData: {
		profilePicture: null | {
			small: string;
			medium: string;
			large: string;
		};
		fullname: string;
		role: AccountRole;
	};
}) => {
	const [showAccountMenu, setShowAccountMenu] = useState<boolean>(false);

	const { loadingBarStart, loadingBarStop } = useLoadingBar();
	const router = useRouter();
	const { axiosErrorHandling } = useAxiosErrorHandling();

	const logout = useCallback(
		async (event: MouseEvent) => {
			event.preventDefault();
			loadingBarStart();
			await axiosInstanceWithToken
				.delete("auth/logout")
				.then(() => {
					deleteAccessToken();
					router.push("/masuk");
				})
				.catch((error: AxiosError) => axiosErrorHandling({ error }));
			loadingBarStop();
		},
		[axiosErrorHandling, loadingBarStart, loadingBarStop, router]
	);

	const [minimizeDesktopNavbar, setMinimizeDesktopNavbar] =
		useState<boolean>(false);
	const [showMobileNavbar, setShowMobileNavbar] = useState<boolean>(false);

	const navbarTogleFunction = useCallback(() => {
		const width: number = window.innerWidth;
		if (width < 1280) setShowMobileNavbar((prev) => !prev);
		else setMinimizeDesktopNavbar((prev) => !prev);
	}, []);

	const [AdditionalTopBarComponent, setAdditionTopBarComponent] =
		useState<null | ReactNode>(null);

	return (
		<topBarContext.Provider
			value={{
				minimizeDesktopNavbar,
				showMobileNavbar,
				navbarTogleFunction,
				setAdditionTopBarComponent,
			}}
		>
			<header className="bg-white border-b border-b-slate-200 w-full h-[64px] flex justify-between items-center gap-[16px] px-[8px] sm:px-[16px] fixed top-0 left-0 z-30">
				<button
					className="w-[40px] h-[40px] grid place-content-center"
					onClick={navbarTogleFunction}
				>
					<FaBars size={24} />
				</button>
				<div className="flex-1 flex items-center">
					<Link href={"/"} className="w-max text-sky-500 flex items-center">
						{" "}
						<BsPuzzleFill size={24} />
						<span>
							Counseling
							<span className="font-bold">Hub</span>
						</span>
					</Link>
					<div className="w-full">{AdditionalTopBarComponent}</div>
				</div>
				<button
					className="w-[40px] h-[40px] grid place-content-center"
					onClick={() => {
						setShowAccountMenu((prev) => !prev);
					}}
				>
					{accountData.profilePicture ? (
						<Image
							alt="Profile Picture"
							src={accountData.profilePicture.small}
							className="w-[30px] h-[30px] rounded-full"
							width={30}
							height={30}
						/>
					) : (
						<FaCircleUser className="fill-slate-400" size={30} />
					)}
				</button>
				<div
					className={`
						bg-white shadow w-[280px] absolute top-[52px] right-[8px] sm:right-[16px] rounded-[4px] overflow-hidden duration-75 ${
							showAccountMenu ? "h-[217px] pb-[8px]" : "h-0 pb-0"
						}`}
				>
					<Link
						href={"/anggota/akun-saya"}
						className="flex px-[12px] py-[8px] gap-[12px] border-b border-slate-200 base-link"
					>
						{accountData.profilePicture ? (
							<Image
								alt="Profile Picture"
								src={accountData.profilePicture.small}
								className="w-[40px] h-[40px] rounded-full"
								width={40}
								height={40}
							/>
						) : (
							<FaCircleUser className="fill-slate-400" size={40} />
						)}
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
							href={"/anggota/edit-akun"}
							className="flex px-[12px] gap-[12px] h-[48px] base-link items-center"
						>
							<FaUserGear size={24} /> <span>Edit Akun</span>
						</Link>
						<Link
							href={"/anggota/ubah-password"}
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
			{children}
		</topBarContext.Provider>
	);
};

export default TopAppBarProvider;

export const useTopBar = () => {
	return useContext(topBarContext) as TopBar;
};
