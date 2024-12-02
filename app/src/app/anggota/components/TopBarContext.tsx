"use client";

import { useAxiosErrorHandlingContext } from "@/app/components/AxiosErrorHandlingContext";
import { useLoadingBarContext } from "@/app/components/LoadingBarContext";
import { axiosInstance } from "@/utils/axios-intance";
import { deleteAccessToken } from "@/utils/server-auth";
import AccountRole from "@/utils/types/account-role";

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
	FaAddressCard,
	FaBars,
	FaCircleUser,
	FaKey,
	FaRightFromBracket,
	FaUserGear,
} from "react-icons/fa6";

type TopBarContext = {
	minimizeDesktopNavbar: boolean;
	showMobileNavbar: boolean;
	navbarTogleFunction: () => void;
	setAdditionTopBarComponent: Dispatch<SetStateAction<null | ReactNode>>;
};

const topBarContext = createContext<null | TopBarContext>(null);

const TopAppBarProvider = ({
	children,
	accountData,
}: {
	children: ReactNode;
	accountData: {
		profilePicture: null | string;
		fullname: string;
		role: AccountRole;
	};
}) => {
	const [showAccountMenu, setShowAccountMenu] = useState<boolean>(false);

	const loadingBar = useLoadingBarContext();
	const router = useRouter();
	const axiosErrorHandling = useAxiosErrorHandlingContext();

	const logout = useCallback(
		async (event: MouseEvent) => {
			event.preventDefault();
			loadingBar.start();
			await axiosInstance
				.delete("auth/logout")
				.catch((error: AxiosError) => axiosErrorHandling({ error }));
			deleteAccessToken();
			loadingBar.stop();
			router.push("/masuk");
		},
		[axiosErrorHandling, loadingBar, router]
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
					<FaCircleUser className="fill-slate-400" size={30} />
				</button>
				<div
					className={`
						bg-white shadow w-[280px] absolute top-[52px] right-[8px] sm:right-[16px] rounded-[4px] overflow-hidden duration-75 ${
							showAccountMenu ? "h-[265px] pb-[8px]" : "h-0 pb-0"
						}`}
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
							href={"/edit-data-diri"}
							className="flex px-[12px] gap-[12px] h-[48px] base-link items-center"
						>
							<FaAddressCard size={24} /> <span>Edit Data Diri</span>
						</Link>
						<Link
							href={"/edit-akun"}
							className="flex px-[12px] gap-[12px] h-[48px] base-link items-center"
						>
							<FaUserGear size={24} /> <span>Edit Akun</span>
						</Link>
						<Link
							href={"/ubah-password"}
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

export const useTopBarContext = () => {
	return useContext(topBarContext) as TopBarContext;
};
