"use client";

import {
	FaChartPie,
	FaClipboardList,
	FaEnvelopeOpenText,
	FaHandHoldingHeart,
} from "react-icons/fa6";
import { FaUserMd } from "react-icons/fa";
import LinkNavbar from "./LinkNavbar";
import { useTopBarContext } from "./TopBarContext";

const KonseliMenu = () => {
	const { minimizeDesktopNavbar } = useTopBarContext();

	return (
		<>
			<div className={"flex flex-col py-[8px]"}>
				<LinkNavbar
					href={"/anggota/dashboard"}
					minimize={minimizeDesktopNavbar}
					Icon={FaChartPie}
					text={"Dashboard"}
				/>
				<LinkNavbar
					href={"/anggota/asessment-saya"}
					minimize={minimizeDesktopNavbar}
					Icon={FaClipboardList}
					text="Asessment Saya"
				/>
				<LinkNavbar
					href={"/anggota/konseling-saya"}
					minimize={minimizeDesktopNavbar}
					Icon={FaHandHoldingHeart}
					text="Konseling Saya"
				/>
				<LinkNavbar
					href={"/anggota/undangan-konseling"}
					minimize={minimizeDesktopNavbar}
					Icon={FaEnvelopeOpenText}
					text="Undangan Konseling"
				/>
				<LinkNavbar
					href={"/anggota/daftar-konselor"}
					minimize={minimizeDesktopNavbar}
					Icon={FaUserMd}
					text="Daftar Konselor"
				/>
			</div>
		</>
	);
};

export default KonseliMenu;
