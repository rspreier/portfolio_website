// src/app/projects/page.jsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import Image from 'next/image';
import { apiUrl } from '@/lib/api';

function ProjectImageLayer({ project, index, scrollIndex }) {
	const opacity = Math.max(0, 1 - Math.abs(scrollIndex - index));
	return (
		<motion.div style={{ opacity }} className="absolute inset-0">
			<Image
				src={project.image || `/img/${project.id}`}
				alt={project.alt || project.title}
				fill
				sizes="(max-width: 768px) 100vw, 50vw"
				loading={index === 0 ? 'eager' : 'lazy'}
				unoptimized={project.image?.endsWith('.gif')}
				className="object-cover"
			/>
		</motion.div>
	);
}

export default function Projects() {
	const [filter, setFilter] = useState('all');
	const [projects, setProjects] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState('');
	const [scrollIndex, setScrollIndex] = useState(0);

	useEffect(() => {
		const fetchProjects = async () => {
			try {
				const response = await fetch(apiUrl('/api/projects'));
				if (!response.ok) {
					throw new Error('Failed to load projects.');
				}
				const data = await response.json();
				setProjects(data);
			} catch (err) {
				setError(err.message || 'Failed to load projects.');
			} finally {
				setIsLoading(false);
			}
		};

		fetchProjects();
	}, []);

	const filteredProjects = filter === 'all'
		? projects
		: projects.filter(project => project.category === filter);

	const containerRef = useRef(null);
	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ['start start', 'end end'],
	});
	useMotionValueEvent(scrollYProgress, 'change', (latest) => {
		if (!Number.isFinite(latest)) {
			return;
		}
		const maxIndex = Math.max(filteredProjects.length - 1, 0);
		setScrollIndex(latest * maxIndex);
	});

	useEffect(() => {
		setScrollIndex(0);
	}, [filter, filteredProjects.length]);

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

				<div className="flex justify-center mb-12">
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
				</div>
			</div>

			<div ref={containerRef} className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12">
				{/* Left side (sticky images) */}
				<div className="relative md:sticky top-32 h-64 sm:h-80 md:h-[500px] rounded-xl overflow-hidden">
					{filteredProjects.map((project, i) => (
						<ProjectImageLayer
							key={project.id}
							project={project}
							index={i}
							scrollIndex={scrollIndex}
						/>
					))}
				</div>

				{/* Right side (scrolling descriptions) */}
				<div className="flex flex-col gap-16">
					{isLoading && (
						<div className="mb-24">
							<p className="text-gray-300">Loading projects...</p>
						</div>
					)}
					{error && !isLoading && (
						<div className="mb-24">
							<p className="text-red-300">{error}</p>
						</div>
					)}
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
