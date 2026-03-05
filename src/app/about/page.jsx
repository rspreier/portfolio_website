// src/app/about/page.jsx
'use client';

import { motion } from 'framer-motion';
import ExperienceTimeline from '@/components/ExperienceTimeline';

export default function About() {
	const experiences = [
		{
			position: 'Capstone Developer',
			company: 'Oregon State University / OptiTrack',
			period: 'Sep 2022 - Jun 2023',
			description:
				'Built and tested a C++ ROS2 plugin for motion-capture data translation, validated behavior on robots, and delivered a live Python demo at the engineering expo.',
		},
		{
			position: 'Mobile App Developer',
			company: 'Oregon State University',
			period: 'Jan 2024 - Mar 2024',
			description:
				'Developed TimeVault, a mobile app for daily time-capsule journaling with photo capture, reminders, and Firebase-backed notifications.',
		},
		{
			position: 'Frontend Web Developer',
			company: 'Oregon State University',
			period: 'Jan 2024 - Mar 2024',
			description:
				'Designed and implemented a peer-to-peer sports betting interface with React, consuming live-odds APIs and iterating on UX for clarity and speed.',
		}
	];

	return (
		<div className="min-h-screen bg-dark text-light pt-24 pb-16">
			<div className="container mx-auto px-4">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="text-center mb-16"
				>
					<h1 className="text-4xl md:text-5xl font-bold text-primary-400 mb-4">About Me</h1>
					<p className="text-xl max-w-3xl mx-auto text-gray-300">
						I build practical software with a focus on clean interfaces, real-world testing, and user-centered functionality.
					</p>
				</motion.div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto mb-20">
					{/* Bio section */}
					<motion.div
						initial={{ opacity: 0, x: -30 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
						className="md:col-span-2"
					>
						<h2 className="text-2xl font-bold text-primary-300 mb-6">My Journey</h2>
						<div className="prose prose-lg prose-invert">
							<p>
								My recent work has centered on turning coursework and collaborative projects into production-style software experiences. I enjoy shipping projects end-to-end, from initial scope and architecture to iteration based on testing and feedback.
							</p>
							<p>
								I am especially interested in frontend engineering, interactive experiences, and systems that connect UI decisions with measurable user value. I like working across the stack when needed, but most of my strength is in building reliable, thoughtful interfaces.
							</p>
						</div>
					</motion.div>

					{/* Skills section */}
					<motion.div
						initial={{ opacity: 0, x: 30 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5, delay: 0.4 }}
					>
						<h2 className="text-2xl font-bold text-primary-300 mb-6">Skills</h2>
						<div className="grid grid-cols-2 gap-3">
							{['JavaScript', 'React', 'Next.js', 'Python', 'C++', 'ROS2', 'Firebase', 'Git'].map((skill) => (
								<div key={skill} className="bg-dark/50 backdrop-blur-sm p-3 rounded-lg border border-primary-700/30">
									{skill}
								</div>
							))}
						</div>
					</motion.div>
				</div>

				{/* Experience Timeline */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.6 }}
					className="max-w-6xl mx-auto"
				>
					<h2 className="text-2xl font-bold text-primary-300  text-center">Experience</h2>
					<ExperienceTimeline experiences={experiences} />
				</motion.div>
			</div>
		</div>
	);
}
