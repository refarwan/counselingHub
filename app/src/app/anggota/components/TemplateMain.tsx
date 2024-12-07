"use client";

import { ReactNode } from "react";
import { useTopBar } from "./TopBar";

const TemplateMain = ({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) => {
	const { minimizeDesktopNavbar } = useTopBar();

	return (
		<main
			className={`mt-[64px] duration-75 min-h-[calc(100vh-64px)] relative ${className} ${
				minimizeDesktopNavbar ? "xl:ml-[80px]" : "xl:ml-[250px]"
			}`}
		>
			{children}
		</main>
	);
};

export default TemplateMain;
