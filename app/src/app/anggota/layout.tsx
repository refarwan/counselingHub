import { getAuthData } from "@/utils/server-auth";
import ReAuthenticate from "./components/ReAunthenticate";
import TopBarProvider from "./components/TopBarContext";
import NavBarContainer from "./components/NavBarContainer";
import AdministratorMenu from "./components/AdministratorMenu";
import KonselorMenu from "./components/KonselorMenu";
import KonseliMenu from "./components/KonseliMenu";

import { ReactNode } from "react";

const Layout = async ({ children }: { children: ReactNode }) => {
	const authData = await getAuthData();

	if (!authData) return <ReAuthenticate />;

	return (
		<TopBarProvider
			accountData={{
				profilePicture: authData.profilePicture,
				fullname: authData.fullname,
				role: authData.role,
			}}
		>
			<NavBarContainer>
				{authData.role === "administrator" ? (
					<AdministratorMenu />
				) : authData.role === "konselor" ? (
					<KonselorMenu />
				) : (
					<KonseliMenu />
				)}
			</NavBarContainer>
			{children}
		</TopBarProvider>
	);
};

export default Layout;
