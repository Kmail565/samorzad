import Navbar from "../ui/navbar";
import {getSession} from "../lib/actions";
import {redirect} from "next/navigation";
import DashboardNavbar from "../ui/dashboard-navbar";

export default async function Layout({
    children,
}: {
    children: React.ReactNode
}) {

    const session = await getSession();
    if(!session.isLoggedIn) redirect("/login");

    return (
        <>
            <DashboardNavbar/>
            {children}
        </>
    );
}
