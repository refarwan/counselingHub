"use client";

import { usePopup } from "./Popup";
import { AxiosError } from "axios";

import {
	Dispatch,
	ReactNode,
	SetStateAction,
	createContext,
	useCallback,
	useContext,
} from "react";

type AxiosErrorHandling = ({
	error,
	setStateAction,
	alertConfirmAction,
}: {
	error: AxiosError;
	setStateAction?: Dispatch<SetStateAction<object>>;
	alertConfirmAction?: () => void;
}) => void;

const axiosErrorHandlingContext = createContext<null | {
	axiosErrorHandling: AxiosErrorHandling;
}>(null);

const AxiosErrorHandlingProvider = ({ children }: { children: ReactNode }) => {
	const { errorPopup } = usePopup();

	const axiosErrorHandling: AxiosErrorHandling = useCallback(
		({ error, setStateAction, alertConfirmAction }) => {
			if (!error.response) return errorPopup(error.message);

			if (typeof error.response.data === "string")
				return errorPopup(error.response.data);

			type Data = { message: string | object };
			const data = error.response.data as Data;
			if (typeof data.message === "string")
				return errorPopup(data.message, () => {
					if (alertConfirmAction) alertConfirmAction();
				});

			if (setStateAction) setStateAction(data.message);
		},
		[errorPopup]
	);

	return (
		<axiosErrorHandlingContext.Provider value={{ axiosErrorHandling }}>
			{children}
		</axiosErrorHandlingContext.Provider>
	);
};

export default AxiosErrorHandlingProvider;

export const useAxiosErrorHandling = () => {
	return useContext(axiosErrorHandlingContext) as {
		axiosErrorHandling: AxiosErrorHandling;
	};
};
