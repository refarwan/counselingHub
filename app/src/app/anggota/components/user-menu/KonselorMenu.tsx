"use client";

import LinkNavbar from "../LinkNavbar";

import {
	FaChartPie,
	FaClipboardList,
	FaHandHoldingHeart,
	FaNewspaper,
	FaPenClip,
} from "react-icons/fa6";
import { FaUserFriends, FaUserMd } from "react-icons/fa";

const KonselorMenu = ({ minimize }: { minimize: boolean }) => {
	return (
		<>
			<div className={"border-b border-b-slate-200 flex flex-col py-[8px]"}>
				<LinkNavbar
					href={"/anggota/dashboard"}
					minimize={minimize}
					Icon={FaChartPie}
					text="Dashboard"
				/>
				<LinkNavbar
					href={"/anggota/public-asessment"}
					minimize={minimize}
					Icon={FaClipboardList}
					text="Public Asessment"
				/>
				<LinkNavbar
					href={"/anggota/konseling-saya"}
					minimize={minimize}
					Icon={FaHandHoldingHeart}
					text="Konseling Saya"
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
			</div>

			<div className={"flex flex-col py-[8px]"}>
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
		</>
	);
};

export default KonselorMenu;
