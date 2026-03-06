// src/app/about/page.jsx
'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ExperienceTimeline from '@/components/ExperienceTimeline';
import { apiUrl } from '@/lib/api';

export default function About() {
	const [experiences, setExperiences] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState('');

	useEffect(() => {
		const fetchExperiences = async () => {
			try {
				const response = await fetch(apiUrl('/api/experiences'));
				if (!response.ok) {
					throw new Error('Failed to load experiences.');
				}
				const data = await response.json();
				setExperiences(data);
			} catch (err) {
				setError(err.message || 'Failed to load experiences.');
			} finally {
				setIsLoading(false);
			}
		};

		fetchExperiences();
	}, []);

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
								I am from Bend, Oregon and have graduated from Oregon State University with a degree in computer science that has a focus on computer systems. I have had experience with programming through multiple years of education, and I have worked in a variety of different groups and projects involving the discipline. My experiences in the past have given me the skills necessary to work effectively within a group and has given my communication skills that is valuable in any development setting. I am currently a Software Developer/Tester at Information Systems Laboratories.
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
							{['Python', 'Go', 'C++', 'Java', 'JavaScript', 'Kotlin', 'React', 'SQL', 'REST API', 'AWS', 'Linux', 'Playwright', 'Git'].map((skill) => (
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
					{isLoading && <p className="text-gray-300 text-center mt-4">Loading experience...</p>}
					{error && !isLoading && <p className="text-red-300 text-center mt-4">{error}</p>}
					{!isLoading && !error && experiences.length === 0 && (
						<p className="text-gray-300 text-center mt-4">No experience entries yet.</p>
					)}
					<ExperienceTimeline experiences={experiences} />
				</motion.div>
			</div>
		</div>
	);
}
