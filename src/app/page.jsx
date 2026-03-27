'use client';

import { useState, useCallback, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import GlitchHero from '@/components/GlitchHero';
import { useSiteTheme } from '@/components/ThemeProvider';

// Spline requires browser APIs — skip SSR
const SplineRoom = dynamic(() => import('@/components/SplineRoom'), { ssr: false });

export default function Home() {
	const { toggleTheme } = useSiteTheme();
	const [showTerminal, setShowTerminal] = useState(false);
	const [flashing, setFlashing] = useState(false);
	const [sceneLoaded, setSceneLoaded] = useState(false);
	const [showHint, setShowHint] = useState(false);

	const handleSceneLoad = useCallback(() => {
		setSceneLoaded(true);
		setShowHint(true);
		setTimeout(() => setShowHint(false), 8000);
	}, []);

	const handleComputerClick = useCallback(() => {
		setFlashing(true);
		setTimeout(() => {
			setShowTerminal(true);
			setFlashing(false);
		}, 350);
	}, []);

	const handleBack = useCallback(() => {
		setFlashing(true);
		setTimeout(() => {
			setShowTerminal(false);
			setFlashing(false);
		}, 350);
	}, []);

	return (
		<main className="relative min-h-screen overflow-hidden">
			{/* 3D scene — always mounted for fast restore */}
			<div
				className="absolute inset-0"
				style={{ visibility: showTerminal ? 'hidden' : 'visible', background: 'var(--site-bg, #f5f5f7)', transition: 'background 0.3s ease' }}
			>
				<SplineRoom onComputerClick={handleComputerClick} onSceneLoad={handleSceneLoad} onThemeToggle={toggleTheme} />
			</div>

			{/* Loading spinner */}
			<AnimatePresence>
				{!sceneLoaded && !showTerminal && (
					<motion.div
						key="loader"
						className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center gap-4"
						style={{ background: 'var(--site-bg, #f5f5f7)' }}
						initial={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.6 }}
					>
						<motion.div
							style={{
								width: 48,
								height: 48,
								borderRadius: '50%',
								border: '3px solid rgba(183,148,244,0.2)',
								borderTop: '3px solid rgba(183,148,244,0.9)',
							}}
							animate={{ rotate: 360 }}
							transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
						/>
						<p
							className="font-mono text-sm tracking-widest"
							style={{ color: 'rgba(183,148,244,0.7)' }}
						>
							LOADING SCENE...
						</p>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Screen-flash transition */}
			<AnimatePresence>
				{flashing && (
					<motion.div
						key="flash"
						className="absolute inset-0 bg-black z-40"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.25 }}
					/>
				)}
			</AnimatePresence>

			{/* Terminal overlay */}
			<AnimatePresence>
				{showTerminal && (
					<motion.div
						key="terminal"
						className="absolute inset-0 z-30"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.4 }}
					>
						<GlitchHero onBack={handleBack} />
					</motion.div>
				)}
			</AnimatePresence>

			{/* Click hint — shown after scene loads, centered */}
			<AnimatePresence>
				{!showTerminal && showHint && (
					<motion.div
						key="hint"
						className="pointer-events-none absolute inset-0 z-20 flex items-end justify-center pb-24"
						initial={{ opacity: 0, y: 8 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 8 }}
						transition={{ duration: 0.5 }}
					>
						<div
							className="flex items-center gap-2 rounded-full px-5 py-2.5 font-mono text-sm"
							style={{
								background: 'rgba(10,10,18,0.72)',
								border: '1px solid rgba(183,148,244,0.35)',
								color: 'rgba(183,148,244,0.9)',
								backdropFilter: 'blur(8px)',
							}}
						>
							<motion.span
								animate={{ scale: [1, 1.3, 1] }}
								transition={{ duration: 1.2, repeat: Infinity }}
							>
								🖱
							</motion.span>
							Click the laptop to open terminal
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</main>
	);
}
