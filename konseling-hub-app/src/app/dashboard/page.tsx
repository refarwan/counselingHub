"use client";

import TopAppBar from "@/components/TopAppBar";
import NavigationBar from "@/components/NavigationBar";
import { useState } from "react";

const Page = () => {
	const [minimize, setMinimize] = useState<boolean>(false);
	const [show, setShow] = useState<boolean>(false);

	const togleMenu = () => {
		const width: number = window.innerWidth;
		if (width < 1280) setShow((prev) => !prev);
		else setMinimize((prev) => !prev);
	};

	return (
		<>
			<TopAppBar togleMenu={togleMenu} />
			<NavigationBar
				minimize={minimize}
				show={show}
				hideAction={() => {
					setShow(false);
				}}
			/>
			<main
				className={
					"mt-[64px] duration-75 bg-red-100 h-[1000px] " +
					(minimize ? "xl:ml-[80px]" : "xl:ml-[250px]")
				}
			>
				Dashboard
			</main>
		</>
	);
};

export default Page;
