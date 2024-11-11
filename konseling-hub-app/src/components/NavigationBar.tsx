"use client";

import Link from "next/link";

import { FaGears } from "react-icons/fa6";

const NavigationBar = ({
	minimize = false,
	show = false,
	hideAction,
}: {
	minimize?: boolean;
	show?: boolean;
	hideAction: () => void;
}) => {
	return (
		<nav
			className={
				"bg-slate-950/50 w-screen h-screen fixed top-0 left-0 flex xl:h-[calc(100%-64px)] xl:top-[64px] duration-75 " +
				(minimize ? " xl:w-[80px]" : " xl:w-[250px]") +
				(show ? " visible" : " invisible xl:visible")
			}
			onClick={hideAction}
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
	);
};

export default NavigationBar;
