// src/app/projects/page.jsx
'use client';

import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

// Sample project data - replace with your own
const projects = [
	{
		id: 'capstone.gif',
		category: 'app',
		title: 'Senior Capstone Project - OSU | September 2022-June 2023',
		description: "One of my notable achievements includes my recent Capstone Project at Oregon State University, where I collaborated with a team of students and project partners from OptiTrack. We developed a C++ plugin for ROS2 to translate data from the company's motion capture software, conducted extensive testing, and created a demonstration for the school's engineering expo. My specific role in this project was to conduct testing of plugin with robots and created a demonstration in Python for the OSU engineering expo. This experience allowed me to gain practical experience in project planning, management, working with new programming languages, Linux OS, version control, and team collaboration.",
		technologies: ['C++', 'Python', 'ROS2', 'Linux', 'Git'],
		image: '/img/capstone.gif',
		alt: 'Capstone demo showing ROS2 plugin output with robot testing'
	},
	// Other projects...
	{
		id: 'timevault.gif',
		category: 'app',
		title: 'TimeVault Application Project- OSU Mobile Development | Jan 2024 - Mar 2024',
		description: "TimeVault is an application that allows users to document their interests and experiences in real-time, " +
										"creating personalized 'time capsules' for future reflection. With features such as photo uploads from camera roll, " +
										"taking a picture using the phone's camera app, text entries, and link attachments, users can capture diverse moments " +
										"and memories with ease. When a user adds an item, it is buried in a 'time capsule' for the day. The calendar interface " +
										"allows for navigation through past capsules so that users can see what they added on certain days, similar to an archive. " +
										"Lastly, there is also an option to schedule reminders through notifications to enhance the user experience by prompting revisits " +
										"to specific capsules on desired dates. This app uses Google's Firebase API to assist with sending notifications. This was a short term " +
										"project for my Mobile Sofware Development class at Oregon State University and was feature on Professor Hess' Hall of Fame.",
		technologies: ['Kotlin', 'Firebase', 'Android Studio', 'XML', 'SQLite', 'API Integration'],
		image: '/img/timevault.gif',
		alt: 'TimeVault mobile app interface with calendar and time-capsule entries'
	},
	{
		id: 'bet.png',
		category: 'web',
		title: 'Betting Application Project- OSU Advanced Web Development | Jan 2024 - Mar 2024',
		description: "This project spotlighted my focus on user interface design and web development. This particular project involved designing a sports " +
										"betting application where users can engage in peer-to-peer betting, rather than traditional house-based betting. Live odds sourced from " +
										"the Odds API fuel the betting system, offering various lines from multiple betting services. To ensure a seamless user experience, I employed " +
										"the React.js framework to construct the frontend of the application. This was a short term project worked on with two other student in the early" +
										"stage of development. More work is to be done on the application with improvements to the interface and adding a backend to the app.",
		technologies: ['React', 'JavaScript', 'HTML/CSS', 'API Integration'],
		image: '/img/bet.png',
		alt: 'Sports betting web application interface with peer-to-peer features'
	},    
];

export default function Projects() {
	const [filter, setFilter] = useState('all');

	const filteredProjects = filter === 'all'
		? projects
		: projects.filter(project => project.category === filter);

	const containerRef = useRef(null);
	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ['start start', 'end end'],
	});

	const imageIndex = useTransform(scrollYProgress, [0, 1], [0, filteredProjects.length - 1]);

	return (
		<div className="min-h-screen bg-dark text-light pt-24 pb-16">
			<div className="container mx-auto px-4">
				<motion.div
					initial={{ opacity: 0, y: 0 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="text-center mb-16"
				>
					<h1 className="text-4xl md:text-5xl font-bold text-primary-400 mb-4">My Projects</h1>
					<p className="text-xl max-w-3xl mx-auto text-gray-300">
						Here are some of the projects I've worked on. Each one represents a unique challenge and learning experience.
					</p>
				</motion.div>

				{/* Filter buttons NOT WORKING FOR NOW, FIX LATER*/}
				{/* <div className="flex justify-center mb-12">
					<div className="join">
						<button
							className={`btn join-item ${filter === 'all' ? 'bg-primary-600 text-white' : 'bg-dark text-gray-300'}`}
							onClick={() => setFilter('all')}
						>
							All
						</button>
						<button
							className={`btn join-item ${filter === 'web' ? 'bg-primary-600 text-white' : 'bg-dark text-gray-300'}`}
							onClick={() => setFilter('web')}
						>
							Web
						</button>
						<button
							className={`btn join-item ${filter === 'app' ? 'bg-primary-600 text-white' : 'bg-dark text-gray-300'}`}
							onClick={() => setFilter('app')}
						>
							Apps
						</button>
					</div>
				</div> */}
			</div>

			<div ref={containerRef} className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12">
				{/* Left side (sticky images) */}
				<div className="relative md:sticky top-32 h-64 sm:h-80 md:h-[500px] rounded-xl overflow-hidden">
					{filteredProjects.map((project, i) => {
						const opacity = useTransform(
							imageIndex,
							[i - 1, i, i + 1],
							[0, 1, 0]
						);
						return (
							<motion.div
								key={project.id}
								style={{ opacity }}
								className="absolute inset-0"
							>
								<Image
									src={project.image || `/img/${project.id}`}
									alt={project.alt || project.title}
									fill
									sizes="(max-width: 768px) 100vw, 50vw"
									loading={i === 0 ? 'eager' : 'lazy'}
									unoptimized={project.image?.endsWith('.gif')}
									className="object-cover"
								/>
							</motion.div>
						);
					})}
				</div>

				{/* Right side (scrolling descriptions) */}
				<div className="flex flex-col gap-16">
					{filteredProjects.length === 0 && (
						<div className="mb-24">
							<p className="text-gray-300">No projects in this category yet.</p>
						</div>
					)}
					{filteredProjects.map((project) => (
						<div key={project.id} className="mb-24">
							<div className="max-w-lg">
								<h2 className="text-2xl md:text-3xl font-bold text-primary-300 mb-4">{project.title}</h2>
								{project.technologies && (
									<div className="flex flex-wrap gap-2 mb-4">
										{project.technologies.map((tech) => (
											<span
												key={tech}
												className="px-3 py-1 text-xs rounded-full bg-primary-900/50 text-primary-200"
											>
												{tech}
											</span>
										))}
									</div>
								)}
								<p className="text-gray-300 leading-relaxed mb-6">{project.description}</p>
								{(project.liveUrl || project.githubUrl) && (
									<div className="flex gap-4">
										{project.liveUrl && (
											<a
												href={project.liveUrl}
												target="_blank"
												rel="noopener noreferrer"
												className="btn btn-sm btn-primary"
											>
												Live Demo
											</a>
										)}
										{project.githubUrl && (
											<a
												href={project.githubUrl}
												target="_blank"
												rel="noopener noreferrer"
												className="btn btn-sm btn-outline btn-primary"
											>
												GitHub
											</a>
										)}
									</div>
								)}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
