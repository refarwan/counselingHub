import { ReactNode } from "react";

import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Akun Saya | CounselingHub",
};

const Layout = ({ children }: { children: ReactNode }) => {
	return children;
};

export default Layout;
