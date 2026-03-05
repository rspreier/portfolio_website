// src/app/about/page.jsx
'use client';

import { motion } from 'framer-motion';
import ExperienceTimeline from '@/components/ExperienceTimeline';

export default function About() {
	const experiences = [
		{
			position: 'Software Developer / Tester',
			company: 'Information Systems Laboratories',
			period: 'December 2024 - Present',
			description:
				'I contributed on the development and testing of simulation software and web-based applications as part of a cross-functional team. I have built full-stack simulation features using Java, Go, Wails, WebSockets, and HTMX, with primary responsibility for GUI design and backend communication. I am also responsible for unit, integrated, and regression testing across multiple applications to ensure functional accuracy and system reliability. This includes developing automated, requirement based tests using test-driven development practices to improve code coverage, maintainability, and refactoring safety.  ',
		},
		{
			position: 'Contract Developer Work',
			company: 'Elysium',
			period: 'July 2024',
			description:
				'Developed a command-line application in Java to embed PDF attachments into existing PDF documents using iText. Utilized Apache Maven for dependency management and build automation.',
		},
		{
			position: 'Techinical Editor',
			company: '3D PDF Consortium',
			period: 'May 2020 - June 2020',
			description:
				'Edited the ISO 24064 standard, ensuring technical content was correctly and consistently formatted and well documented according to International Standards Organization (ISO) guidelines. Used Adobe Acrobat Reader and Microsoft Word to review and prepare documentation for publication.',
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
					<ExperienceTimeline experiences={experiences} />
				</motion.div>
			</div>
		</div>
	);
}
