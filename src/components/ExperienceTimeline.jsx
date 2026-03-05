// src/components/ExperienceTimeline.jsx
'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Single timeline item component
const TimelineItem = ({ position, company, period, description, index }) => {
	const itemRef = useRef(null);
	
	// Use scroll for animation with a larger range to make it smoother
	const { scrollYProgress } = useScroll({
		target: itemRef,
		offset: ["start end", "center center"]
	});
	
	// Alternate items left and right
	const isEven = index % 2 === 0;
	
	// Transform x position based on scroll - using a continuous curve
	const x = useTransform(
		scrollYProgress,
		[0, 1],
		[isEven ? -500 : 500, 0]
	);
	
	// Transform y position based on scroll for a floating effect
	const y = useTransform(
		scrollYProgress,
		[0, 1],
		[50, 0]
	);
	
	// Transform opacity based on scroll - using a continuous curve
	const opacity = useTransform(
		scrollYProgress,
		[0, 0.3],
		[0, 1]
	);
	
	return (
		<div ref={itemRef} className="mb-24 relative min-h-[200px]">
			{/* Timeline center line */}
			<div className="absolute left-1/2 transform -translate-x-1/2 h-full border-l-2 border-primary-500/30"></div>
			
			{/* Timeline dot with scroll-based animation */}
			<motion.div 
				style={{ 
					backgroundColor: useTransform(
						scrollYProgress,
						[0, 0.5],
						["rgb(128, 90, 213, 0.5)", "rgb(128, 90, 213, 1)"]
					)
				}}
				className="absolute left-1/2 transform -translate-x-1/2 top-6 w-6 h-6 rounded-full z-10 shadow-lg shadow-primary-500/30"
			>
				{/* Inner pulse effect */}
				<motion.div 
					style={{ 
						opacity: useTransform(scrollYProgress, [0, 0.5], [0, 1]) 
					}}
					className="absolute inset-0 m-auto w-4 h-4 rounded-full bg-primary-400 animate-pulse"
				/>
			</motion.div>
			
			{/* Content container */}
			<motion.div 
				style={{ 
					x,
					y,
					opacity,
					// Add a slight rotation for more visual interest
					rotate: useTransform(
						scrollYProgress, 
						[0, 1], 
						[isEven ? -2 : 2, 0]
					)
				}}
				className={`md:w-5/12 bg-dark/60 backdrop-blur-sm p-6 rounded-xl border border-primary-700/30 shadow-xl hover:shadow-primary-900/20 hover:border-primary-600/40 transition-all duration-300 mt-6 ${
					isEven ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
				}`}
			>
				{/* Date indicator inside the container */}
				<div className="text-primary-300 font-medium text-sm mb-2">
					{period}
				</div>
				
				<h3 className="text-2xl font-bold text-primary-300 mb-1">{position}</h3>
				<h4 className="text-xl font-medium text-gray-300 mb-3">{company}</h4>
				<div className="w-16 h-1 bg-primary-500/50 rounded-full mb-4"></div>
				<p className="text-gray-300 leading-relaxed">{description}</p>
				
				{/* Optional: Add a "Learn more" button or link */}
				<div className="mt-4 text-right">
					<button className="text-primary-400 hover:text-primary-300 text-sm font-medium transition-colors">
						Learn more →
					</button>
				</div>
			</motion.div>
		</div>
	);
};

export default function ExperienceTimeline({ experiences }) {
	return (
		<div className="relative py-16">
			{/* Timeline start indicator */}
			<div className="absolute left-1/2 transform -translate-x-1/2 top-0 w-3 h-3 rounded-full bg-primary-500"></div>
			
			{experiences.map((exp, index) => (
				<TimelineItem
					key={index}
					index={index}
					position={exp.position}
					company={exp.company}
					period={exp.period}
					description={exp.description}
				/>
			))}
			
			{/* Timeline end indicator */}
			<div className="absolute left-1/2 transform -translate-x-1/2 bottom-0 w-3 h-3 rounded-full bg-primary-500"></div>
		</div>
	);
}