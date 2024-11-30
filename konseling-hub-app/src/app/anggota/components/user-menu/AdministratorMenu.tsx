"use client";

import LinkNavbar from "../LinkNavbar";

import {
	FaChartPie,
	FaClipboardList,
	FaEarthAsia,
	FaFile,
	FaFilePen,
	FaHospitalUser,
	FaNewspaper,
	FaPenClip,
} from "react-icons/fa6";
import { FaUserFriends, FaUserMd } from "react-icons/fa";

const AdministratorMenu = ({ minimize }: { minimize: boolean }) => {
	return (
		<>
			<div className={"border-b border-b-slate-200 flex flex-col py-[8px]"}>
				<LinkNavbar
					href={"/anggota/dashboard"}
					minimize={minimize}
					Icon={FaChartPie}
					text="Dashboard"
				/>
			</div>
			<div className={"border-b border-b-slate-200 flex flex-col py-[8px]"}>
				<div
					className={
						"w-full h-[48px] px-[16px] leading-[48px] font-semibold text-[18px]" +
						(minimize ? " xl:hidden" : "")
					}
				>
					Anggota
				</div>
				<LinkNavbar
					href={"/anggota/daftar-konselor"}
					minimize={minimize}
					Icon={FaUserMd}
					text="Daftar Konselor"
				/>
				<LinkNavbar
					href={"/anggota/daftar-konseli"}
					minimize={minimize}
					Icon={FaUserFriends}
					text="Daftar Konseli"
				/>
				<LinkNavbar
					href={"/anggota/pengajuan-konselor"}
					minimize={minimize}
					Icon={FaHospitalUser}
					text="Pengajuan Konselor"
				/>
			</div>
			<div className={"border-b border-b-slate-200 flex flex-col py-[8px]"}>
				<div
					className={
						"w-full h-[48px] px-[16px] leading-[48px] font-semibold text-[18px]" +
						(minimize ? " xl:hidden" : "")
					}
				>
					Halaman
				</div>
				<LinkNavbar
					href={"/anggota/daftar-halaman"}
					minimize={minimize}
					Icon={FaFile}
					text="Daftar Halaman"
				/>
				<LinkNavbar
					href={"/anggota/buat-halaman"}
					minimize={minimize}
					Icon={FaFilePen}
					text="Buat Halaman"
				/>
			</div>
			<div className={"border-b border-b-slate-200 flex flex-col py-[8px]"}>
				<div
					className={
						"w-full h-[48px] px-[16px] leading-[48px] font-semibold text-[18px]" +
						(minimize ? " xl:hidden" : "")
					}
				>
					Artikel
				</div>
				<LinkNavbar
					href={"/anggota/daftar-artikel"}
					minimize={minimize}
					Icon={FaNewspaper}
					text="Daftar Artikel"
				/>
				<LinkNavbar
					href={"/anggota/buat-artikel"}
					minimize={minimize}
					Icon={FaPenClip}
					text="Buat Artikel"
				/>
			</div>
			<div className={"flex flex-col py-[8px]"}>
				<LinkNavbar
					href={"/anggota/public-asessment"}
					minimize={minimize}
					Icon={FaClipboardList}
					text="Public Asessment"
				/>
				<LinkNavbar
					href={"/anggota/landing-page"}
					minimize={minimize}
					Icon={FaEarthAsia}
					text="Landing Page"
				/>
			</div>
		</>
	);
};

export default AdministratorMenu;
