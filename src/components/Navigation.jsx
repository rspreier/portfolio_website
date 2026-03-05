'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

export default function Navigation() {
	const [isScrolled, setIsScrolled] = useState(false);
	const pathname = usePathname();
	const isHomePage = pathname === '/';
	
	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 10);
		};
		
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	// Determine text color based on page and scroll state
	const getLinkTextColor = (isActive) => {
		if (isHomePage && !isScrolled) {
			// On home page and not scrolled: black text
			return isActive ? 'text-black font-medium' : 'text-black hover:text-primary-700';
		} else {
			// On other pages or when scrolled: light text
			return isActive ? 'text-primary-400 font-medium' : 'text-light hover:text-primary-300';
		}
	};

	return (
		<motion.header
			initial={{ y: -100 }}
			animate={{ y: 0 }}
			transition={{ duration: 0.5 }}
			className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
				isScrolled ? 'bg-dark/90 backdrop-blur-md py-2' : 'bg-transparent py-2'
			}`}
		>
			<div className="container mx-auto px-4">
				<div className="navbar">
					<div className="navbar-start">
						<Link href="/" className="relative w-16 h-16 rounded-lg bg-white">
							<Image 
								src="/img/logo.png" 
								alt="Site logo" 
								fill
								priority
								sizes="64px"
								loading="eager"
								className="object-contain"
							/>
						</Link>
					</div>
					<div className="navbar-end">
						<ul className="menu menu-horizontal px-1 hidden md:flex">
							{['About', 'Projects', 'Contact'].map((item) => (
								<li key={item}>
									<Link 
										href={`/${item.toLowerCase()}`}
										className={`text-lg ${getLinkTextColor(pathname === `/${item.toLowerCase()}`)}`}
									>
										{item}
									</Link>
								</li>
							))}
						</ul>
						<div className="dropdown dropdown-end md:hidden">
							<label tabIndex={0} className={`btn btn-ghost ${isHomePage && !isScrolled ? 'text-black' : 'text-light'}`}>
								<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
								</svg>
							</label>
							<ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-dark rounded-box w-52">
								{['About', 'Projects', 'Contact'].map((item) => (
									<li key={item}>
										<Link 
											href={`/${item.toLowerCase()}`}
											className={pathname === `/${item.toLowerCase()}` ? 'text-primary-400' : ''}
										>
											{item}
										</Link>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			</div>
		</motion.header>
	);
}
