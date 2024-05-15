import React from 'react'

import Link from 'next/link';

export default function Navbar() {
    return (
        <>
            <header className="header">
                <Link className="w-20 h-20 rounded-lg bg-white items-center
            justify-center flex font-bold shadow-md" href="/">
                    <img src="/img/logo.png" alt="Home" />
                </Link>
            <ul className="flex text-lg gap-7 font-medium">
                <li>
                    <Link 
                        className="text-black hover:text-purple-100"
                        href="/about">About
                    </Link>
                </li>
                <li>
                    <Link 
                        className="text-black hover:text-purple-100"
                        href="/projects">Projects
                    </Link>
                </li>
                <li>
                    <Link
                        className="text-black hover:text-purple-100"
                        href="/contact">Contact
                    </Link>
                </li>
            </ul>
            </header>
        </>
    )
}