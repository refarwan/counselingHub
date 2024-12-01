"use client";

import AccountRole from "@/utils/types/account-role";
import TopAppBar from "./TopAppBar";

import {
	ComponentType,
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useContext,
	useState,
} from "react";

export type AppLayoutContext = {
	setTopAppBarComponent: Dispatch<SetStateAction<ReactNode | null>>;
};

const appLayoutContext = createContext<null | AppLayoutContext>(null);

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
	const [TopAppBarComponent, setTopAppBarComponent] =
		useState<null | ReactNode>(null);
	const [minimize, setMinimize] = useState<boolean>(false);
	const [show, setShow] = useState<boolean>(false);

	const togleMenuFunction = () => {
		const width: number = window.innerWidth;
		if (width < 1280) setShow((prev) => !prev);
		else setMinimize((prev) => !prev);
	};
	return (
		<appLayoutContext.Provider value={{ setTopAppBarComponent }}>
			<TopAppBar accountData={accountData} togleMenu={togleMenuFunction}>
				{TopAppBarComponent ? TopAppBarComponent : null}
			</TopAppBar>
			<nav
				className={
					"bg-slate-950/50 w-screen h-screen fixed top-0 left-0 flex xl:h-[calc(100%-64px)] xl:top-[64px] duration-75 " +
					(minimize ? " xl:w-[80px]" : " xl:w-[250px]") +
					(show ? " visible" : " invisible xl:visible")
				}
				onClick={togleMenuFunction}
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
		</appLayoutContext.Provider>
	);
};

export default AppLayoutProvider;

export const useAppLayoutContext = () => {
	return useContext(appLayoutContext) as AppLayoutContext;
};
