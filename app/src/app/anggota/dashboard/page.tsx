"use client";

import { usePopupContext } from "@/app/components/PopupContext";
import TemplateMain from "../components/TemplateMain";

const Page = () => {
	const popup = usePopupContext();
	return (
		<TemplateMain>
			<button onClick={() => popup.success("test")} className="filled-button">
				Test
			</button>
			Daftar Konselor
		</TemplateMain>
	);
};

export default Page;
