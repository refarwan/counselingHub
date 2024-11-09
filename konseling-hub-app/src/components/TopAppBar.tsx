"use client";

import Link from "next/link";
import { ReactNode, useState } from "react";

import {
	FaBars,
	FaAddressCard,
	FaHeadphones,
	FaUserGear,
	FaKey,
	FaRightFromBracket,
} from "react-icons/fa6";

const TopAppBar = ({
	togleMenu,
	children,
}: {
	togleMenu?: () => void;
	children?: ReactNode;
}) => {
	const [showMenu, setSHowMenu] = useState<boolean>(false);
	return (
		<>
			<header className="bg-white border-b border-b-slate-200 w-full h-[64px] flex justify-between items-center gap-[16px] px-[8px] sm:px-[16px] fixed top-0 left-0">
				<button
					className="w-[40px] h-[40px] grid place-content-center"
					onClick={() => {
						togleMenu ? togleMenu() : null;
					}}
				>
					<FaBars size={24} />
				</button>
				<div className="flex-1 flex items-center">
					<Link href={"/"} className="w-max text-sky-600 flex items-center">
						<FaHeadphones size={24} />{" "}
						<span>
							<span className="font-bold">Teman</span>
							Dengar
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
					<div className="bg-red-700 h-[30px] w-[30px] rounded-full"></div>
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
						<div className="bg-red-700 h-[40px] w-[40px] rounded-full"></div>
						<div>
							<span>Darrell Steward</span>
							<div className="bg-sky-600 text-white w-max px-[8px] rounded-[4px]">
								Konseli
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
						<Link
							href={"/"}
							className="flex px-[12px] gap-[12px] h-[48px] base-link items-center"
						>
							<FaRightFromBracket size={24} /> <span>Keluar</span>
						</Link>
					</div>
				</div>
			</header>
		</>
	);
};

export default TopAppBar;
