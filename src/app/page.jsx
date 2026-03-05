'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SplineScene from '@/components/SplineScene';

export default function Home() {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		// Simulate loading time for Spline scene
		const timer = setTimeout(() => {
			setIsLoading(false);
		}, 2000);
		
		return () => clearTimeout(timer);
	}, []);

	return (
		<main className="flex min-h-screen flex-col items-center justify-center bg-dark text-light">
			{isLoading ? (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					className="text-center"
				>
					<div className="loading loading-spinner loading-lg text-primary-500"></div>
					<p className="mt-4 text-xl">Loading experience...</p>
				</motion.div>
			) : (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 1 }}
					className="w-full h-screen"
				>
					<SplineScene />
				</motion.div>
			)}
		</main>
	);
}