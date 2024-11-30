"use client";

import AccountRole from "@/utils/types/account-role";

import {
	ComponentType,
	createContext,
	ReactNode,
	useContext,
	useState,
} from "react";

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
	Menu,
}: {
	children: ReactNode;
	accountData: {
		profilePicture: null | string;
		fullname: string;
		role: AccountRole;
	};
	Menu: ComponentType<{ minimize: boolean }>;
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
						"bg-white border-r border-r-slate-200 w-[250px] h-screen px-[8px] xl:w-full duration-75 fixed overflow-hidden xl:relative xl:overflow-y-scroll" +
						(minimize ? " xl:px-[10px]" : "") +
						(show ? " left-0" : " left-[-250px] xl:left-0")
					}
					onClick={(event) => event.stopPropagation()}
				>
					<Menu minimize={minimize} />
				</div>
			</nav>
			<main
				className={
					"mt-[64px] duration-75 " +
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
