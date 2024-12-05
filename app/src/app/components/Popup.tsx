"use client";

import {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useRef,
	useState,
	useCallback,
} from "react";

import {
	FaCircleCheck,
	FaCircleExclamation,
	FaCircleQuestion,
} from "react-icons/fa6";

type Alert = (message: string, onConfirm?: () => void) => void;

type Confirm = (
	message: string,
	onConfirm?: () => void,
	onCancel?: () => void
) => void;

type Popup = {
	alertPopup: Alert;
	successPopup: Alert;
	errorPopup: Alert;
	confirmPopup: Confirm;
};

const popupContext = createContext<null | Popup>(null);

const PopupProvider = ({ children }: { children: ReactNode }) => {
	type AlertPopup = {
		type: "normalAlert" | "successAlert" | "errorAlert";
		message: string;
		onConfirm?: () => void;
	};

	type ConfirmPopup = {
		type: "confirm";
		message: string;
		onConfirm?: () => void;
		onCancel?: () => void;
	};

	const [popupVisible, setPopupVisible] = useState<boolean>(true);

	const [arrayPopup, setArrayPopup] = useState<(AlertPopup | ConfirmPopup)[]>(
		[]
	);

	const alertPopup: Alert = useCallback(
		(message: string, onConfirm?: () => void) => {
			setArrayPopup((prev) => [
				...prev,
				{ type: "normalAlert", message, onConfirm },
			]);
		},
		[]
	);

	const successPopup: Alert = useCallback(
		(message: string, onConfirm?: () => void) => {
			setArrayPopup((prev) => [
				...prev,
				{ type: "successAlert", message, onConfirm },
			]);
		},
		[]
	);

	const errorPopup: Alert = useCallback(
		(message: string, onConfirm?: () => void) => {
			setArrayPopup((prev) => [
				...prev,
				{ type: "errorAlert", message, onConfirm },
			]);
		},
		[]
	);

	const confirmPopup: Confirm = useCallback(
		(message: string, onConfirm?: () => void, onCancel?: () => void) => {
			setArrayPopup((prev) => [
				...prev,
				{ type: "confirm", message, onConfirm, onCancel },
			]);
		},
		[]
	);

	const confirmButtonRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		if (arrayPopup.length) {
			setTimeout(() => {
				confirmButtonRef.current?.focus();
			}, 75);
		}
	}, [arrayPopup]);

	const confirmHandle = useCallback(() => {
		setPopupVisible(false);
		setTimeout(() => {
			if (arrayPopup[0]?.onConfirm) arrayPopup[0].onConfirm();
			setArrayPopup((prev) => prev.slice(1));
			setPopupVisible(true);
		}, 75);
	}, [arrayPopup]);

	const cancelHandle = useCallback(() => {
		setPopupVisible(false);
		setTimeout(() => {
			if (
				arrayPopup[0] &&
				arrayPopup[0].type === "confirm" &&
				arrayPopup[0].onCancel
			)
				arrayPopup[0].onCancel();
			setArrayPopup((prev) => prev.slice(1));
			setPopupVisible(true);
		}, 75);
	}, [arrayPopup]);

	return (
		<popupContext.Provider
			value={{ alertPopup, successPopup, errorPopup, confirmPopup }}
		>
			{arrayPopup[0] ? (
				<div
					className={`bg-slate-950/30 w-screen h-screen top-0 left-0 z-40 fixed duration-75 ${
						popupVisible ? "visible" : "invisible"
					}`}
				>
					<div
						className={`bg-white w-[300px] p-[25px] rounded-[4px] flex flex-col items-center gap-[30px] m-auto duration-75 animate-popup-show ${
							popupVisible ? "visible" : "invisible"
						}`}
					>
						<div className="w-full flex flex-col gap-[10px] items-center">
							{arrayPopup[0].type === "successAlert" ? (
								<FaCircleCheck size={50} className="fill-sky-500" />
							) : arrayPopup[0].type === "errorAlert" ? (
								<FaCircleExclamation size={50} className="fill-red-700" />
							) : arrayPopup[0].type === "confirm" ? (
								<FaCircleQuestion size={50} className="fill-sky-500" />
							) : null}
							<p className="w-full text-center">{arrayPopup[0].message}</p>
						</div>

						<div className="w-full flex gap-[10px] justify-center">
							{arrayPopup[0].type === "confirm" ? (
								<button
									onClick={() => {
										cancelHandle();
									}}
									className="text-button"
								>
									Batal
								</button>
							) : null}
							<button
								ref={confirmButtonRef}
								onClick={() => {
									confirmHandle();
								}}
								className="filled-button"
							>
								Oke
							</button>
						</div>
					</div>
				</div>
			) : null}
			{children}
		</popupContext.Provider>
	);
};

export default PopupProvider;

export const usePopup = () => {
	return useContext(popupContext) as Popup;
};
