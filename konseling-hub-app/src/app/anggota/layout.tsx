import AppLayoutProvider from "@/app/anggota/components/AppLayoutContext";
import { getAuthData } from "@/utils/server-auth";
import ReAuthenticate from "./components/ReAunthenticate";

import { ReactNode } from "react";

const Layout = async ({ children }: { children: ReactNode }) => {
	const authData = await getAuthData();

	if (!authData) return <ReAuthenticate />;

	return (
		<AppLayoutProvider
			accountData={{
				profilePicture: authData.profilePicture,
				fullname: authData.fullname,
				role: authData.role,
			}}
		>
			{children}
		</AppLayoutProvider>
	);
};

export default Layout;
