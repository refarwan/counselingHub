import { BsPuzzleFill } from "react-icons/bs";
import TemplateMain from "./TemplateMain";
import { FaSpinner } from "react-icons/fa6";

const LoadingPage = () => {
	return (
		<TemplateMain className="grid place-content-center">
			<div className="text-sky-500 flex flex-col items-center">
				<BsPuzzleFill size={80} />
				<span className="text-[50px]">
					counseling<span className="font-bold">Hub</span>
				</span>
			</div>
			<FaSpinner size={30} className="animate-spin fill-sky-500 m-auto" />
		</TemplateMain>
	);
};

export default LoadingPage;
