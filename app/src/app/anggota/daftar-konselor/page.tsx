"use client";

import { useEffect } from "react";
import TemplateMain from "../components/TemplateMain";
import { useTopBarContext } from "../components/TopBarContext";

const Page = () => {
	const { setAdditionTopBarComponent } = useTopBarContext();
	useEffect(() => {
		setAdditionTopBarComponent(
			<input
				type="text"
				placeholder="Search"
				className="block m-auto w-[300px] border"
			></input>
		);
		return () => setAdditionTopBarComponent(null);
	}, [setAdditionTopBarComponent]);
	return <TemplateMain>Daftar Konselor</TemplateMain>;
};

export default Page;
