import TemplateMain from "./TemplateMain";

import { FaScrewdriverWrench } from "react-icons/fa6";

const UnderDevelopment = () => {
	return (
		<TemplateMain className="flex flex-col gap-[8px] px-[24px] justify-center items-center">
			<FaScrewdriverWrench size={100} className="fill-sky-500" />
			<div className="sm:w-[500px]">
				<h1 className="text-sky-500 font-semibold text-[26px] text-center">
					Sedang dalam pengembangan
				</h1>
				<p className="text-center">
					Aduh maaf ya halaman, ini masih dalam proses pengembangan :(
				</p>
			</div>
		</TemplateMain>
	);
};

export default UnderDevelopment;
