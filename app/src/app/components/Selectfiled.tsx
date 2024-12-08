"use client";

import { ChangeEvent, ChangeEventHandler, RefObject, useState } from "react";

import { FaExclamationCircle } from "react-icons/fa";
import clsx from "clsx";
import { FaCaretDown } from "react-icons/fa6";

type Props = {
	ref?: RefObject<HTMLSelectElement>;
	name?: string;
	options: { value: string; text: string }[];
	value?: string;
	label?: string;
	supporting?: string | string[];
	disabled?: boolean;
	isError?: boolean;
	onChange?: ChangeEventHandler<HTMLSelectElement>;
	className?: string;
};

const SelectField = ({
	ref,
	name,
	options,
	value,
	label,
	supporting,
	disabled = false,
	isError = false,
	onChange,
	className,
}: Props) => {
	const [isFocus, setIsFocus] = useState<boolean>(false);
	const [isIsset, setIsIsset] = useState<boolean>(value ? true : false);

	const initialChangeEvent = (event: ChangeEvent<HTMLSelectElement>) => {
		setIsIsset(event.target.value ? true : false);
	};

	return (
		<div
			className={`${className} min-h-[64px] flex flex-col gap-[4px] pt-[8px] relative`}
		>
			<select
				name={name}
				ref={ref}
				value={value}
				className={`border-[1px] rounded-[4px] w-full h-[56px] ${
					isIsset ? "z-0" : "z-10"
				} transition-[z-index] pl-[15px] pr-[51px] appearance-none outline-none bg-transparent relative delay-150 focus:border-[2px] focus:pl-[14px] focus:pr-[50px] focus:delay-0 focus:z-0  disabled:opacity-100 disabled:z-0 disabled:border-slate-400 disabled:bg-slate-100 disabled:text-slate-400 ${
					isError ? "border-red-700" : "border-slate-950 focus:border-sky-500"
				}`}
				disabled={disabled}
				onFocus={() => setIsFocus(true)}
				onBlur={(event) => {
					setIsFocus(false);
					setIsIsset(event.target.value ? true : false);
				}}
				onChange={onChange && initialChangeEvent}
			>
				<option className="hidden"></option>
				{options.map((item, index) => (
					<option value={item.value} key={index}>
						{item.text}
					</option>
				))}
			</select>
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
							: "top-[24px] left-[16px]"
					}`}
				>
					{label}
				</div>
			) : null}
			<FaCaretDown
				size={24}
				className={`absolute top-[24px] right-[12px] z-0 ${clsx({
					"fill-red-700": isError,
					"fill-sky-500": isFocus && !isError,
					"fill-slate-400": disabled,
				})}`}
			/>
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

export default SelectField;
