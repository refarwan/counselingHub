"use client"

import { AxiosError } from "axios"
import {
	Dispatch,
	ReactNode,
	SetStateAction,
	createContext,
	useCallback,
	useContext,
} from "react"

import { usePopupContext } from "./PopupContext"

type AxiosErrorHandling = (
	error: AxiosError,
	setStateAction?: Dispatch<SetStateAction<any>>
) => void

type AxiosErrorHandlingContext = {
	axiosErrorHandling: AxiosErrorHandling
}

const axiosErrorHandlingContext =
	createContext<null | AxiosErrorHandlingContext>(null)

const AxiosErrorHandlingProvider = ({ children }: { children: ReactNode }) => {
	const { errorAlertPopup } = usePopupContext()

	const axiosErrorHandling: AxiosErrorHandling = useCallback(
		(error: AxiosError, setStateAction?: Dispatch<SetStateAction<any>>) => {
			if (!error.response) return errorAlertPopup(error.message)

			if (typeof error.response.data === "string")
				return errorAlertPopup(error.response.data)

			type Data = { message: string | object }
			const data = error.response.data as Data
			if (typeof data.message === "string") return errorAlertPopup(data.message)

			if (setStateAction) setStateAction(data.message)
		},
		[errorAlertPopup]
	)

	return (
		<axiosErrorHandlingContext.Provider value={{ axiosErrorHandling }}>
			{children}
		</axiosErrorHandlingContext.Provider>
	)
}

export default AxiosErrorHandlingProvider

export const useAxiosErrorHandlingContext = () => {
	return useContext(axiosErrorHandlingContext) as AxiosErrorHandlingContext
}
