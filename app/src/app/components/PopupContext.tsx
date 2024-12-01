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

type AlertFunction = (message: string, onConfirm?: () => void) => void;

type ConfirmFunction = (
	message: string,
	onConfirm?: () => void,
	onCancel?: () => void
) => void;

type PopupContext = {
	alert: AlertFunction;
	success: AlertFunction;
	error: AlertFunction;
	confirm: ConfirmFunction;
};

const popupContext = createContext<null | PopupContext>(null);

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

	const alert: AlertFunction = useCallback(
		(message: string, onConfirm?: () => void) => {
			setArrayPopup((prev) => [
				...prev,
				{ type: "normalAlert", message, onConfirm },
			]);
		},
		[]
	);

	const success: AlertFunction = useCallback(
		(message: string, onConfirm?: () => void) => {
			setArrayPopup((prev) => [
				...prev,
				{ type: "successAlert", message, onConfirm },
			]);
		},
		[]
	);

	const error: AlertFunction = useCallback(
		(message: string, onConfirm?: () => void) => {
			setArrayPopup((prev) => [
				...prev,
				{ type: "errorAlert", message, onConfirm },
			]);
		},
		[]
	);

	const confirm: ConfirmFunction = useCallback(
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
		<popupContext.Provider value={{ alert, success, error, confirm }}>
			{arrayPopup[0] ? (
				<div
					className={`bg-slate-950/30 w-screen h-screen top-0 left-0 z-40 fixed duration-75 pt-[200px] ${
						popupVisible ? "visible" : "invisible"
					}`}
				>
					<div
						className={`bg-white w-[300px] p-[25px] rounded-[4px] flex flex-col items-center gap-[30px] m-auto ${
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

export const usePopupContext = () => {
	return useContext(popupContext) as PopupContext;
};
