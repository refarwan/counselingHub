"use client";

import LinkNavbar from "./LinkNavbar";

import {
	FaChartPie,
	FaClipboardList,
	FaEarthAsia,
	FaFile,
	FaFilePen,
	FaNewspaper,
	FaPenClip,
} from "react-icons/fa6";
import { FaUserFriends, FaUserMd } from "react-icons/fa";
import { useTopBar } from "./TopBar";

const AdministratorMenu = () => {
	const { minimizeDesktopNavbar } = useTopBar();
	return (
		<>
			<div className={"border-b border-b-slate-200 flex flex-col py-[8px]"}>
				<LinkNavbar
					href={"/anggota/dashboard"}
					minimize={minimizeDesktopNavbar}
					Icon={FaChartPie}
					text="Dashboard"
				/>
			</div>
			<div className={"border-b border-b-slate-200 flex flex-col py-[8px]"}>
				<div
					className={
						"w-full h-[48px] px-[16px] leading-[48px] font-semibold text-[18px]" +
						(minimizeDesktopNavbar ? " xl:hidden" : "")
					}
				>
					Anggota
				</div>
				<LinkNavbar
					href={"/anggota/daftar-konselor"}
					minimize={minimizeDesktopNavbar}
					Icon={FaUserMd}
					text="Daftar Konselor"
				/>
				<LinkNavbar
					href={"/anggota/daftar-konseli"}
					minimize={minimizeDesktopNavbar}
					Icon={FaUserFriends}
					text="Daftar Konseli"
				/>
			</div>
			<div className={"border-b border-b-slate-200 flex flex-col py-[8px]"}>
				<div
					className={
						"w-full h-[48px] px-[16px] leading-[48px] font-semibold text-[18px]" +
						(minimizeDesktopNavbar ? " xl:hidden" : "")
					}
				>
					Halaman
				</div>
				<LinkNavbar
					href={"/anggota/daftar-halaman"}
					minimize={minimizeDesktopNavbar}
					Icon={FaFile}
					text="Daftar Halaman"
				/>
				<LinkNavbar
					href={"/anggota/buat-halaman"}
					minimize={minimizeDesktopNavbar}
					Icon={FaFilePen}
					text="Buat Halaman"
				/>
			</div>
			<div className={"border-b border-b-slate-200 flex flex-col py-[8px]"}>
				<div
					className={
						"w-full h-[48px] px-[16px] leading-[48px] font-semibold text-[18px]" +
						(minimizeDesktopNavbar ? " xl:hidden" : "")
					}
				>
					Artikel
				</div>
				<LinkNavbar
					href={"/anggota/daftar-artikel"}
					minimize={minimizeDesktopNavbar}
					Icon={FaNewspaper}
					text="Daftar Artikel"
				/>
				<LinkNavbar
					href={"/anggota/buat-artikel"}
					minimize={minimizeDesktopNavbar}
					Icon={FaPenClip}
					text="Buat Artikel"
				/>
			</div>
			<div className={"flex flex-col py-[8px]"}>
				<LinkNavbar
					href={"/anggota/public-asessment"}
					minimize={minimizeDesktopNavbar}
					Icon={FaClipboardList}
					text="Public Asessment"
				/>
				<LinkNavbar
					href={"/anggota/landing-page"}
					minimize={minimizeDesktopNavbar}
					Icon={FaEarthAsia}
					text="Landing Page"
				/>
			</div>
		</>
	);
};

export default AdministratorMenu;
