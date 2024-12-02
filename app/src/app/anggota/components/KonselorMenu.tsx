"use client";

import LinkNavbar from "./LinkNavbar";

import {
	FaChartPie,
	FaClipboardList,
	FaHandHoldingHeart,
	FaNewspaper,
	FaPenClip,
} from "react-icons/fa6";
import { FaUserFriends, FaUserMd } from "react-icons/fa";
import { useTopBarContext } from "./TopBarContext";

const KonselorMenu = () => {
	const { minimizeDesktopNavbar } = useTopBarContext();

	return (
		<>
			<div className={"border-b border-b-slate-200 flex flex-col py-[8px]"}>
				<LinkNavbar
					href={"/anggota/dashboard"}
					minimize={minimizeDesktopNavbar}
					Icon={FaChartPie}
					text="Dashboard"
				/>
				<LinkNavbar
					href={"/anggota/public-asessment"}
					minimize={minimizeDesktopNavbar}
					Icon={FaClipboardList}
					text="Public Asessment"
				/>
				<LinkNavbar
					href={"/anggota/konseling-saya"}
					minimize={minimizeDesktopNavbar}
					Icon={FaHandHoldingHeart}
					text="Konseling Saya"
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

			<div className={"flex flex-col py-[8px]"}>
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
		</>
	);
};

export default KonselorMenu;
