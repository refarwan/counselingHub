import "./globals.css";
import LoadingBarProvider from "@/app/components/LoadingBar";
import PopupProvider from "@/app/components/Popup";
import AxiosErrorHandlingProvider from "@/app/components/AxiosErrorHandling";

import { ReactNode } from "react";

import type { Metadata } from "next";
import { Poppins } from "next/font/google";

export const metadata: Metadata = {
	title: "CounselingHub",
	description: "CounselingHub by Tessera Indonesia",
};

const poppins = Poppins({
	weight: ["300", "400", "500", "600", "700"],
	subsets: ["latin"],
});

const Layout = ({ children }: { children: ReactNode }) => {
	return (
		<html lang="in">
			<body className={poppins.className + " text-slate-950 bg-white"}>
				<LoadingBarProvider>
					<PopupProvider>
						<AxiosErrorHandlingProvider>{children}</AxiosErrorHandlingProvider>
					</PopupProvider>
				</LoadingBarProvider>
			</body>
		</html>
	);
};

export default Layout;
