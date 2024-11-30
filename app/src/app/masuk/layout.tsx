import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
	title: "Masuk | CounselingHub",
};

const Layout = ({ children }: { children: ReactNode }) => {
	return children;
};

export default Layout;
