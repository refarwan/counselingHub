"use client";

import {
	FaChartPie,
	FaClipboardList,
	FaEnvelopeOpenText,
	FaHandHoldingHeart,
} from "react-icons/fa6";
import { FaUserMd } from "react-icons/fa";
import LinkNavbar from "../LinkNavbar";

const KonseliMenu = ({ minimize }: { minimize: boolean }) => {
	return (
		<>
			<div className={"flex flex-col py-[8px]"}>
				<LinkNavbar
					href={"/anggota/dashboard"}
					minimize={minimize}
					Icon={FaChartPie}
					text={"Dashboard"}
				/>
				<LinkNavbar
					href={"/anggota/asessment-saya"}
					minimize={minimize}
					Icon={FaClipboardList}
					text="Asessment Saya"
				/>
				<LinkNavbar
					href={"/anggota/konseling-saya"}
					minimize={minimize}
					Icon={FaHandHoldingHeart}
					text="Konseling Saya"
				/>
				<LinkNavbar
					href={"/anggota/asessment-saya"}
					minimize={minimize}
					Icon={FaEnvelopeOpenText}
					text="Undangan Konseling"
				/>
				<LinkNavbar
					href={"/anggota/asessment-saya"}
					minimize={minimize}
					Icon={FaUserMd}
					text="Daftar Konselor"
				/>
			</div>
		</>
	);
};

export default KonseliMenu;
