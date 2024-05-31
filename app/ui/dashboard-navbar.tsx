import Link from "next/link";
import styles from "@/app/styles/dashboard/sidebar.module.scss"
import {logout} from "@/app/lib/login";
import {getSession} from "@/app/lib/actions";
import {HomeIcon, UsersIcon, AdjustmentsHorizontalIcon, Cog8ToothIcon,PowerIcon} from "@heroicons/react/24/outline";
import {LinkIcon} from "@heroicons/react/16/solid";

const links = [
    {name: "Strona główna", href: "/dashboard", icon:HomeIcon, access: [] },
    {name: "Zarządaj kontami", href: '/dashboard/users', icon:UsersIcon, access: ['ADMINISTRATOR']},
    {name: "Edytuj aktualności", href: '/dashboard/blog', icon:AdjustmentsHorizontalIcon, access: ['ADMINISTRATOR','MODERATOR']},
    {name: "Edytuj profil", href: "/dashboard/profile", icon:Cog8ToothIcon, access: [] },
]

export default async function DashboardNavbar()
{

    const session = await getSession();

    return(
        <>
            <div className={styles.sidebar}>
                <div className={styles.title}>
                    <h1>XIV LO SAMORZĄD</h1>
                    <h2>Panel Administracji</h2>
                </div>
                <div className={styles.navbar}>
                    {links.map((link) => {
                        const LinkIcon = link.icon;
                        const isActive = false;
                        return (
                            <div key={link.href}>
                                {(!link.access.length || link.access.includes(session.user?.permission as string)) &&
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={styles.navbar_link}
                                    >
                                        <button id={isActive ? styles.navbar_button_active : ""}>
                                            <LinkIcon className={styles.navbar_icon}/>
                                            <p> {link.name} </p>
                                        </button>
                                    </Link>
                                }
                            </div>
                        )
                    })}
                </div>
                <div className={styles.logout}>
                    <form action={logout}>
                        <button>
                            <PowerIcon className={styles.logout_icon}/>
                            <p>Wyloguj się</p>
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}