import { ReactNode } from "react";

import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Dashboard | Konseling Hub",
};

const Layout = ({ children }: { children: ReactNode }) => {
	return children;
};

export default Layout;
