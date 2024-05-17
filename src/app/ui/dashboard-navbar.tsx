'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
    {name: "Home", href: '/'},
    {name: "Blog", href: '/blog'},
    {name: "Sports", href: '/sports'},
    {name: "Events", href: '/events'},
    {name: "About", href: '/about'},
]

export default function Navbar() {
    const pathname = usePathname();
    return(
        <>
            <div>
                {links.map((link) => {
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                        >
                            {link.name}
                        </Link>
                    );
                })}
            </div>
        </>
    );
}