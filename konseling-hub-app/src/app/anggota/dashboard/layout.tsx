import { ReactNode } from "react";

import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Masuk | Konseling Hub",
};

const Layout = ({ children }: { children: ReactNode }) => {
	return children;
};

export default Layout;
