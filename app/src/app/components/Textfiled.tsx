"use client";

import { ChangeEventHandler, ComponentType, useEffect, useState } from "react";

import { FaExclamationCircle } from "react-icons/fa";
import clsx from "clsx";

type Props = {
	type?: string;
	name?: string;
	value?: string;
	placeholder?: string;
	label?: string;
	supporting?: string | string[];
	LeadingIcon?: ComponentType<{ className?: string; size?: number }>;
	disabled?: boolean;
	isError?: boolean;
	onChange?: ChangeEventHandler<HTMLInputElement>;
	className?: string;
	minLength?: number;
	maxLength?: number;
};

const TextField = ({
	type = "text",
	name,
	value,
	placeholder,
	label,
	supporting,
	LeadingIcon,
	disabled = false,
	isError = false,
	onChange,
	className,
	minLength,
	maxLength,
}: Props) => {
	const [isFocus, setIsFocus] = useState<boolean>(false);
	const [isIsset, setIsIsset] = useState<boolean>(false);

	useEffect(() => {
		setIsIsset(value ? true : false);
	}, [value]);

	return (
		<div
			className={`${className} min-h-[64px] flex flex-col gap-[4px] pt-[8px] relative`}
		>
			<input
				type={type}
				name={name}
				placeholder={isFocus ? placeholder : undefined}
				value={value}
				minLength={minLength}
				maxLength={maxLength}
				className={`border-[1px] rounded-[4px] w-full h-[56px] ${
					isIsset ? "z-0" : "z-10"
				} transition-[z-index] ${
					LeadingIcon
						? "pl-[51px] focus:pl-[50px]"
						: "pl-[15px] focus:pl-[14px]"
				} pr-[15px] outline-none bg-transparent relative focus:border-[2px] delay-150 focus:delay-0 focus:z-0 disabled:opacity-100 disabled:border-slate-400 disabled:bg-slate-100 disabled:text-slate-400 ${
					isError ? "border-red-700" : "border-slate-950 focus:border-sky-500"
				}`}
				onChange={onChange}
				onFocus={() => setIsFocus(true)}
				onBlur={(event) => {
					setIsIsset(event.target.value ? true : false);
					setIsFocus(false);
				}}
				disabled={disabled}
			/>
			{label ? (
				<div
					className={`h-[24px] absolute transition-[font-size,_left,_top,_padding] ${clsx(
						{
							" bg-slate-100 text-slate-400": disabled,
							" bg-white": !disabled,
							" text-red-700": !disabled && isError,
							" text-sky-500": !disabled && !isError && isFocus,
						}
					)} ${
						isFocus || isIsset
							? "text-[12px] px-[4px] top-0 left-[12px] h-[16px]"
							: `top-[24px] ${LeadingIcon ? "left-[52px]" : "left-[16px]"}`
					}`}
				>
					{label}
				</div>
			) : null}
			{LeadingIcon ? (
				<LeadingIcon
					size={24}
					className={`absolute left-[12px] top-[24px] ${clsx({
						"fill-red-700": isError,
						"fill-sky-500": isFocus && !isError,
						"fill-slate-400": disabled,
					})}`}
				/>
			) : null}
			{supporting ? (
				typeof supporting === "string" ? (
					<div
						className={`text-[12px] pr-[16px] flex gap-[8px] items-center ${clsx(
							{
								" text-slate-400": disabled,
								" pl-[16px]": !isError || disabled,
								" text-red-700": isError && !disabled,
							}
						)}`}
					>
						{isError && !disabled ? <FaExclamationCircle size={16} /> : null}
						{supporting}
					</div>
				) : (
					supporting.map((item, index) => (
						<div
							key={index}
							className={`text-[12px] pr-[16px] flex gap-[8px] items-center ${clsx(
								{
									" text-slate-400": disabled,
									" pl-[16px]": !isError || disabled,
									" text-red-700": isError && !disabled,
								}
							)}`}
						>
							{isError && !disabled ? <FaExclamationCircle size={16} /> : null}
							{item}
						</div>
					))
				)
			) : null}
		</div>
	);
};

export default TextField;
