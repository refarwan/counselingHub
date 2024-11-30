import AppLayoutProvider from "@/app/anggota/components/AppLayoutContext";
import { getAuthData } from "@/utils/server-auth";
import ReAuthenticate from "./components/ReAunthenticate";
import AdministratorMenu from "./components/user-menu/AdministratorMenu";
import KonselorMenu from "./components/user-menu/KonselorMenu";
import KonseliMenu from "./components/user-menu/KonseliMenu";

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
			Menu={
				authData.role === "administrator"
					? AdministratorMenu
					: authData.role === "konselor"
					? KonselorMenu
					: KonseliMenu
			}
		>
			{children}
		</AppLayoutProvider>
	);
};

export default Layout;
