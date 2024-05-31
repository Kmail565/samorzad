import {redirect} from "next/navigation";
import {getSession} from "@/app/lib/actions";
import styles from "@/app/styles/dashboard/main.module.scss"
import DashboardNavbar from "@/app/ui/dashboard-navbar";

export default async function Layout({
    children,
}: {
    children: React.ReactNode
}) {

    const session = await getSession();
    if(!session.isLoggedIn) redirect("/login");

    return (
        <body className={styles.body}>
            <DashboardNavbar/>
            {children}
        </body>
    );
}
