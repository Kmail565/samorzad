import {getSession} from "../lib/actions";
import Link from "next/link";
import LogoutForm from "./forms/logout-form";

const links = [
    {name: "Users", href: '/dashboard/users', access: ['ADMINISTRATOR']},
    {name: "Blog", href: '/dashboard/blog', access: ['ADMINISTRATOR','MODERATOR']},
]


export default async function DashboardNavbar()
{
    const session = await getSession();
    return(
        <>
            <div>
                <Link href="/dashboard">
                    Home
                </Link>
                {links.map((link) => (
                    <>
                        {link.access.includes(session.user?.permission as string) &&
                            <Link
                                key={link.href}
                                href={link.href}
                            >
                                {link.name}
                            </Link>
                        }
                    </>
                ))}
                <Link href="/dashboard/profile">
                    Profile
                </Link>
            </div>
            <LogoutForm/>
        </>
    );
}