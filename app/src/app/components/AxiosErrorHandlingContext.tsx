"use client";

import { usePopupContext } from "./PopupContext";
import { AxiosError } from "axios";

import {
	Dispatch,
	ReactNode,
	SetStateAction,
	createContext,
	useCallback,
	useContext,
} from "react";

type AxiosErrorHandlingContext = ({
	error,
	setStateAction,
	alertConfirmAction,
}: {
	error: AxiosError;
	setStateAction?: Dispatch<SetStateAction<object>>;
	alertConfirmAction?: () => void;
}) => void;

const axiosErrorHandlingContext =
	createContext<null | AxiosErrorHandlingContext>(null);

const AxiosErrorHandlingProvider = ({ children }: { children: ReactNode }) => {
	const popup = usePopupContext();

	const axiosErrorHandling: AxiosErrorHandlingContext = useCallback(
		({ error, setStateAction, alertConfirmAction }) => {
			if (!error.response) return popup.error(error.message);

			if (typeof error.response.data === "string")
				return popup.error(error.response.data);

			type Data = { message: string | object };
			const data = error.response.data as Data;
			if (typeof data.message === "string")
				return popup.error(data.message, () => {
					if (alertConfirmAction) alertConfirmAction();
				});

			if (setStateAction) setStateAction(data.message);
		},
		[popup]
	);

	return (
		<axiosErrorHandlingContext.Provider value={axiosErrorHandling}>
			{children}
		</axiosErrorHandlingContext.Provider>
	);
};

export default AxiosErrorHandlingProvider;

export const useAxiosErrorHandlingContext = () => {
	return useContext(axiosErrorHandlingContext) as AxiosErrorHandlingContext;
};
