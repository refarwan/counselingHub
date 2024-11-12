"use client";

import {
	ComponentType,
	Dispatch,
	SetStateAction,
	useEffect,
	useRef,
	useState,
} from "react";

import { FaExclamationCircle } from "react-icons/fa";
import clsx from "clsx";

type Props = {
	type?: string;
	name?: string;
	value?: string;
	placeholder?: string;
	label?: string;
	supporting?: string | string[];
	leadingIcon?: ComponentType<{ className?: string; size?: number }>;
	disabled?: boolean;
	isError?: boolean;
	setStateAction?: Dispatch<SetStateAction<string>>;
	onChange?: () => void;
};

const TextField = ({
	type = "text",
	name,
	value = "",
	placeholder,
	label,
	supporting,
	leadingIcon: LeadingIcon,
	disabled = false,
	isError = false,
	setStateAction,
	onChange,
}: Props) => {
	const [isActive, setIsActive] = useState<boolean>(false);
	const refInput = useRef<HTMLInputElement>(null);
	const [currentValue, setCurrentValue] = useState<string>(value);

	useEffect(() => {
		setCurrentValue(value);
	}, [value]);

	const focus = () => {
		if (!disabled) {
			setIsActive(true);
			setTimeout(() => {
				refInput.current?.focus();
			}, 1);
		}
	};

	return (
		<div className="flex flex-col gap-[4px] pt-[8px] relative">
			{label ? (
				<div
					className={
						"h-[24px] absolute transition-[font-size,_left,_top,_padding]" +
						(disabled ? " bg-slate-100" : " bg-white") +
						(disabled ? " text-slate-400" : "") +
						(!disabled && isError && (isActive || currentValue)
							? " text-red-700"
							: "") +
						(!disabled && isActive && !isError ? " text-sky-500" : "") +
						(isActive || currentValue
							? " text-[12px] px-[4px] top-0 left-[12px] h-[16px]"
							: ` top-[24px] ${LeadingIcon ? "left-[52px]" : "left-[16px]"}`)
					}
					onClick={focus}
				>
					{label}
				</div>
			) : null}
			<div
				className={`h-[56px] rounded overflow-hidden flex items-center gap-[16px] cursor-text ${
					!disabled && isActive
						? " border-[2px] pr-[14px]"
						: " border pr-[15px]"
				} ${
					LeadingIcon
						? !disabled && isActive
							? " pl-[10px]"
							: " pl-[11px]"
						: !disabled && isActive
						? " pl-[14px]"
						: " pl-[15px]"
				} ${clsx({
					"border-slate-950": !disabled && !isError && !isActive,
					"border-slate-400 bg-slate-100": disabled,
					"border-red-700": !disabled && isError,
					"border-sky-500": !disabled && !isError && isActive,
				})}`}
				onClick={focus}
			>
				{LeadingIcon ? (
					<LeadingIcon size={24} className={disabled ? "fill-slate-400" : ""} />
				) : null}
				<input
					type={type}
					name={name}
					ref={refInput}
					placeholder={placeholder}
					onBlur={() => setIsActive(false)}
					className={
						"outline-none flex-1" +
						(disabled ? " bg-slate-100 text-slate-400" : "") +
						(isActive || currentValue ? " block" : " hidden")
					}
					onChange={(event) => {
						setCurrentValue(event.target.value);
						if (setStateAction) setStateAction(event.target.value);
						if (onChange) onChange();
					}}
					value={currentValue}
					disabled={disabled}
				/>
			</div>
			{supporting ? (
				typeof supporting === "string" ? (
					<div
						className={`text-[12px] pr-[16px] flex gap-[8px] items-center ${clsx(
							disabled && " text-slate-400",
							!isError && " pl-[16px]",
							isError && !disabled && " text-red-700"
						)}`}
					>
						{isError ? <FaExclamationCircle size={16} /> : null}
						{supporting}
					</div>
				) : (
					supporting.map((item, index) => (
						<div
							key={index}
							className={`text-[12px] pr-[16px] flex gap-[8px] items-center ${clsx(
								disabled && " text-slate-400",
								!isError && " pl-[16px]",
								isError && !disabled && " text-red-700"
							)}`}
						>
							{isError ? <FaExclamationCircle size={16} /> : null}
							{item}
						</div>
					))
				)
			) : null}
		</div>
	);
};

export default TextField;
