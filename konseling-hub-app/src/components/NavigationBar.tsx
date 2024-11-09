"use client";

import { useState } from "react";

import Link from "next/link";

import { FaGears } from "react-icons/fa6";

const NavigationBar = ({
	minimize = false,
	show = false,
}: {
	minimize?: boolean;
	show?: boolean;
}) => {
	const [isMinimized, setIsMinimized] = useState<boolean>(true);

	return (
		<nav
			className={
				"bg-slate-950/50 w-screen h-screen fixed top-0 left-0 flex xl:h-[calc(100%-64px)] xl:top-[64px] " +
				(isMinimized ? "xl:w-[80px]" : "xl:w-[250px]")
			}
		>
			<div
				className={
					"bg-white border-r border-r-slate-200 w-[250px] px-[8px] xl:w-full " +
					(isMinimized ? "xl:py-[8px] xl:px-[10px]" : "")
				}
			>
				<div className="border-b border-b-slate-200 flex flex-col pb-[8px]">
					<div
						className={
							"w-full h-[48px] px-[16px] leading-[48px]" +
							(isMinimized ? " xl:hidden" : "")
						}
					>
						Label 1
					</div>
					<Link
						href={"/"}
						className={
							"w-full h-[48px] px-[16px] rounded-[8px] flex items-center gap-[12px] base-link bg-sky-100" +
							(isMinimized ? " xl:gap-0 p-0 w-max" : "")
						}
					>
						<FaGears size={24} />{" "}
						<span className={isMinimized ? "xl:hidden" : ""}>Menu 1</span>
					</Link>
					<Link
						href={"/"}
						className={
							"w-full h-[48px] px-[16px] rounded-[8px] flex items-center gap-[12px] base-link" +
							(isMinimized ? " xl:gap-0 p-0 w-max" : "")
						}
					>
						<FaGears size={24} />{" "}
						<span className={isMinimized ? "xl:hidden" : ""}>Menu 2</span>
					</Link>
					<Link
						href={"/"}
						className={
							"w-full h-[48px] px-[16px] rounded-[8px] flex items-center gap-[12px] base-link" +
							(isMinimized ? " xl:gap-0 p-0 w-max" : "")
						}
					>
						<FaGears size={24} />{" "}
						<span className={isMinimized ? "xl:hidden" : ""}>Menu 3</span>
					</Link>
					<Link
						href={"/"}
						className={
							"w-full h-[48px] px-[16px] rounded-[8px] flex items-center gap-[12px] base-link" +
							(isMinimized ? " xl:gap-0 p-0 w-max" : "")
						}
					>
						<FaGears size={24} />{" "}
						<span className={isMinimized ? "xl:hidden" : ""}>Menu 4</span>
					</Link>
				</div>
				<div className="flex flex-col pb-[8px]">
					<div
						className={
							"w-full h-[48px] px-[16px] leading-[48px]" +
							(isMinimized ? " xl:hidden" : "")
						}
					>
						Label 2
					</div>
					<Link
						href={"/"}
						className={
							"w-full h-[48px] px-[16px] rounded-[8px] flex items-center gap-[12px] base-link" +
							(isMinimized ? " xl:gap-0 p-0 w-max" : "")
						}
					>
						<FaGears size={24} />{" "}
						<span className={isMinimized ? "xl:hidden" : ""}>Menu 5</span>
					</Link>
					<Link
						href={"/"}
						className={
							"w-full h-[48px] px-[16px] rounded-[8px] flex items-center gap-[12px] base-link" +
							(isMinimized ? " xl:gap-0 p-0 w-max" : "")
						}
					>
						<FaGears size={24} />{" "}
						<span className={isMinimized ? "xl:hidden" : ""}>Menu 6</span>
					</Link>
					<Link
						href={"/"}
						className={
							"w-full h-[48px] px-[16px] rounded-[8px] flex items-center gap-[12px] base-link" +
							(isMinimized ? " xl:gap-0 p-0 w-max" : "")
						}
					>
						<FaGears size={24} />{" "}
						<span className={isMinimized ? "xl:hidden" : ""}>Menu 7</span>
					</Link>
				</div>
			</div>
		</nav>
	);
};

export default NavigationBar;
