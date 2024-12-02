"use client";

import { ReactNode } from "react";
import { useTopBarContext } from "./TopBarContext";

const NavBarContainer = ({ children }: { children: ReactNode }) => {
	const { minimizeDesktopNavbar, showMobileNavbar, navbarTogleFunction } =
		useTopBarContext();
	return (
		<nav
			className={
				"bg-slate-950/50 w-screen h-screen fixed top-0 left-0 flex xl:h-[calc(100%-64px)] xl:top-[64px] duration-75 " +
				(minimizeDesktopNavbar ? " xl:w-[80px]" : " xl:w-[250px]") +
				(showMobileNavbar ? " visible" : " invisible xl:visible")
			}
			onClick={navbarTogleFunction}
		>
			<div
				className={
					"bg-white border-r border-r-slate-200 w-[250px] h-screen xl:h-full px-[8px] xl:w-full duration-75 fixed overflow-hidden xl:relative xl:overflow-y-scroll" +
					(minimizeDesktopNavbar ? " xl:px-[10px]" : "") +
					(showMobileNavbar ? " left-0" : " left-[-250px] xl:left-0")
				}
				onClick={(event) => event.stopPropagation()}
			>
				{children}
			</div>
		</nav>
	);
};

export default NavBarContainer;
