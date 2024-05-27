'use client';
import Link from 'next/link';

const links = [
    {name: "Home", href: '/'},
    {name: "Blog", href: '/blog'},
    {name: "Sports", href: '/sports'},
    {name: "Events", href: '/events'},
    {name: "About", href: '/about'},
    {name: "Dashboard", href: '/dashboard'},
    {name: "Login", href: '/login'},
]

export default function Navbar() {
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