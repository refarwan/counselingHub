"use client";

import AccountRole from "@/utils/types/account-role";

import { createContext, ReactNode, useContext, useState } from "react";

import Link from "next/link";

import { FaGears } from "react-icons/fa6";
import TopAppBar from "./TopAppBar";

export type NavigationBarContext = {
	togleMenu: () => void;
	minimize: boolean;
	show: boolean;
};

const navigationBarContext = createContext<null | NavigationBarContext>(null);

const AppLayoutProvider = ({
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
	const [minimize, setMinimize] = useState<boolean>(false);
	const [show, setShow] = useState<boolean>(false);

	const togleMenu = () => {
		const width: number = window.innerWidth;
		if (width < 1280) setShow((prev) => !prev);
		else setMinimize((prev) => !prev);
	};
	return (
		<navigationBarContext.Provider value={{ togleMenu, minimize, show }}>
			<TopAppBar accountData={accountData} togleMenu={togleMenu} />
			<nav
				className={
					"bg-slate-950/50 w-screen h-screen fixed top-0 left-0 flex xl:h-[calc(100%-64px)] xl:top-[64px] duration-75 " +
					(minimize ? " xl:w-[80px]" : " xl:w-[250px]") +
					(show ? " visible" : " invisible xl:visible")
				}
				onClick={togleMenu}
			>
				<div
					className={
						"bg-white border-r border-r-slate-200 w-[250px] h-screen px-[8px] xl:w-full duration-75 fixed xl:relative" +
						(minimize ? " xl:px-[10px]" : "") +
						(show ? " left-0" : " left-[-250px] xl:left-0")
					}
					onClick={(event) => event.stopPropagation()}
				>
					<div
						className={
							"border-b border-b-slate-200 flex flex-col pb-[8px]" +
							(minimize ? " xl:pt-[8px]" : "")
						}
					>
						<div
							className={
								"w-full h-[48px] px-[16px] leading-[48px]" +
								(minimize ? " xl:hidden" : "")
							}
						>
							Label 1
						</div>
						<Link
							href={"/"}
							className={
								"w-full h-[48px] px-[16px] rounded-[8px] flex items-center gap-[12px] base-link bg-sky-100" +
								(minimize ? " xl:gap-0 p-0 xl:w-max" : "")
							}
						>
							<FaGears size={24} />{" "}
							<span className={minimize ? "xl:hidden" : ""}>Menu 1</span>
						</Link>
						<Link
							href={"/"}
							className={
								"w-full h-[48px] px-[16px] rounded-[8px] flex items-center gap-[12px] base-link" +
								(minimize ? " xl:gap-0 p-0 xl:w-max" : "")
							}
						>
							<FaGears size={24} />{" "}
							<span className={minimize ? "xl:hidden" : ""}>Menu 2</span>
						</Link>
						<Link
							href={"/"}
							className={
								"w-full h-[48px] px-[16px] rounded-[8px] flex items-center gap-[12px] base-link" +
								(minimize ? " xl:gap-0 p-0 xl:w-max" : "")
							}
						>
							<FaGears size={24} />{" "}
							<span className={minimize ? "xl:hidden" : ""}>Menu 3</span>
						</Link>
						<Link
							href={"/"}
							className={
								"w-full h-[48px] px-[16px] rounded-[8px] flex items-center gap-[12px] base-link" +
								(minimize ? " xl:gap-0 p-0 xl:w-max" : "")
							}
						>
							<FaGears size={24} />{" "}
							<span className={minimize ? "xl:hidden" : ""}>Menu 4</span>
						</Link>
					</div>
					<div
						className={
							"flex flex-col pb-[8px]" + (minimize ? " xl:pt-[8px]" : "")
						}
					>
						<div
							className={
								"w-full h-[48px] px-[16px] leading-[48px]" +
								(minimize ? " xl:hidden" : "")
							}
						>
							Label 2
						</div>
						<Link
							href={"/"}
							className={
								"w-full h-[48px] px-[16px] rounded-[8px] flex items-center gap-[12px] base-link" +
								(minimize ? " xl:gap-0 p-0 xl:w-max" : "")
							}
						>
							<FaGears size={24} />{" "}
							<span className={minimize ? "xl:hidden" : ""}>Menu 5</span>
						</Link>
						<Link
							href={"/"}
							className={
								"w-full h-[48px] px-[16px] rounded-[8px] flex items-center gap-[12px] base-link" +
								(minimize ? " xl:gap-0 p-0 xl:w-max" : "")
							}
						>
							<FaGears size={24} />{" "}
							<span className={minimize ? "xl:hidden" : ""}>Menu 6</span>
						</Link>
						<Link
							href={"/"}
							className={
								"w-full h-[48px] px-[16px] rounded-[8px] flex items-center gap-[12px] base-link" +
								(minimize ? " xl:gap-0 p-0 xl:w-max" : "")
							}
						>
							<FaGears size={24} />{" "}
							<span className={minimize ? "xl:hidden" : ""}>Menu 7</span>
						</Link>
					</div>
				</div>
			</nav>
			<main
				className={
					"mt-[64px] duration-75 h-[1000px] " +
					(minimize ? "xl:ml-[80px]" : "xl:ml-[250px]")
				}
			>
				{children}
			</main>
		</navigationBarContext.Provider>
	);
};

export default AppLayoutProvider;

export const useNavigationBarContext = () => {
	return useContext(navigationBarContext) as NavigationBarContext;
};
