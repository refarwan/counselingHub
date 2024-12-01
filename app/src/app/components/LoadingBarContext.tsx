"use client";

import {
	ReactNode,
	createContext,
	useCallback,
	useContext,
	useState,
} from "react";

export type LoadingBarContext = {
	start(): void;
	stop(): void;
};

const loadingBarContext = createContext<null | LoadingBarContext>(null);

const LoadingBarProvider = ({ children }: { children: ReactNode }) => {
	const [loadingBarState, setLoadingBarState] = useState<boolean>(false);

	const start = useCallback(() => {
		setLoadingBarState(true);
	}, []);

	const stop = useCallback(() => {
		setLoadingBarState(false);
	}, []);

	return (
		<loadingBarContext.Provider value={{ start, stop }}>
			{loadingBarState ? (
				<div
					className={`animate-line-loader h-[5px] fixed z-50 top-0 bg-sky-500`}
				></div>
			) : null}
			{children}
		</loadingBarContext.Provider>
	);
};

export default LoadingBarProvider;

export const useLoadingBarContext = () => {
	return useContext(loadingBarContext) as LoadingBarContext;
};
