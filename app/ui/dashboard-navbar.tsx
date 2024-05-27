import {getSession} from "../lib/actions";
import {usePathname} from "next/navigation";
import Link from "next/link";
import LogoutForm from "./forms/logout-form";

const links = [
    {name: "Home", href: '/dashboard', access: ['ADMINISTRATOR']},
    {name: "Users", href: '/dashboard/users', access: ['ADMINISTRATOR']},
    {name: "Blog", href: '/dashboard/blog', access: ['ADMINISTRATOR','MODERATOR']},
]


export default async function DashboardNavbar()
{
    const session = await getSession();
    return(
        <>
            <div>
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
            </div>
            <LogoutForm/>
        </>
    );
}