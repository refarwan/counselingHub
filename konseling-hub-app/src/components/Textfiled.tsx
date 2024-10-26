"use client";

import {
	ComponentType,
	Dispatch,
	SetStateAction,
	useRef,
	useState,
} from "react";
import { MdError } from "react-icons/md";

type Props = {
	type?: string;
	name?: string;
	value?: string;
	placeholder?: string;
	label?: string;
	supporting?: string;
	leadingIcon?: ComponentType<{ className?: string; size?: number }>;
	disabled?: boolean;
	isError?: boolean;
	setStateAction?: Dispatch<SetStateAction<string>>;
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
}: Props) => {
	const [isActive, setIsActive] = useState<boolean>(false);
	const refInput = useRef<HTMLInputElement>(null);
	const [currentValue, setCurrentValue] = useState<string>(value);

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
						"h-[24px] absolute transition-[top_left]" +
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
				className={
					"h-[56px] rounded overflow-hidden flex items-center gap-[16px] cursor-text" +
					(disabled ? " border-slate-400 bg-slate-100" : "") +
					(!disabled && isActive && !isError
						? " border-sky-500"
						: " border-slate-950") +
					(!disabled && (isActive || currentValue)
						? " border-[2px] pr-[14px]"
						: " border pr-[15px]") +
					(LeadingIcon
						? !disabled && (isActive || currentValue)
							? " pl-[10px]"
							: " pl-[11px]"
						: !disabled && (isActive || currentValue)
						? " pl-[14px]"
						: " pl-[15px]") +
					(isError ? " border-red-700" : "")
				}
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
					}}
					value={currentValue}
					disabled={disabled}
				/>
			</div>
			{supporting ? (
				<div
					className={
						"text-[12px] pr-[16px] flex gap-[8px] items-center" +
						(disabled ? " text-slate-400" : "") +
						(!disabled && isError ? " text-red-700" : " pl-[16px]")
					}
				>
					{!disabled && isError ? <MdError size={16} /> : null}
					{supporting}
				</div>
			) : null}
		</div>
	);
};

export default TextField;
