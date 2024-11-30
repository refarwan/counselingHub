import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconType } from "react-icons";

const LinkNavbar = ({
	href,
	Icon,
	text,
	minimize,
}: {
	href: string;
	Icon: IconType;
	text: string;
	minimize: boolean;
}) => {
	const pathname = usePathname();

	return (
		<Link
			href={href}
			className={`w-full h-[48px] px-[16px] rounded-[8px] flex items-center gap-[8px] base-link ${
				pathname === href ? "bg-sky-100" : ""
			} ${minimize ? " xl:gap-0 p-0 xl:w-max" : " xl:min-w-[230px]"}`}
		>
			<Icon size={22} />
			<span className={minimize ? "xl:hidden" : ""}>{text}</span>
		</Link>
	);
};

export default LinkNavbar;
