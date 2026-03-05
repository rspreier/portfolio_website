'use client';

import { useEffect, useState } from 'react';
import Spline from '@splinetool/react-spline';
import { useRouter } from 'next/navigation';

export default function SplineScene() {
	const router = useRouter();
	const [spline, setSpline] = useState(null);

	// Define routes mapping for Spline objects
	const routes = {
		'ABOUT': '/about',
		'PROJECTS': '/projects',
		'CONTACT': '/contact',
		'HOME': '/',
		// Add more mappings as needed based on your Spline scene object names
	};

	function onLoad(splineApp) {
		setSpline(splineApp);
		// You can access and animate Spline objects here
		console.log('Spline scene loaded');
	}

	function onSplineMouseDown(e) {
		if (e.target && e.target.name) {
			console.log('Clicked on:', e.target.name);
			const route = routes[e.target.name];
			if (route) {
				handleNavigate(route);
			}
		}
	}

	function handleNavigate(destination) {
		// Add animation before navigation
		console.log('Navigating to:', destination);
		
		// Optional: animate the clicked object if needed
		if (spline) {
			// Example animation if you want to add it
			// const obj = spline.findObjectByName(name);
			// if (obj) spline.emitEvent('mouseDown', obj);
		}
		
		setTimeout(() => {
			router.push(destination);
		}, 500);
	}

	return (
		<div className="w-full h-full">
			{/* Replace with your actual Spline scene URL */}
			<Spline
				scene="https://prod.spline.design/obSTGJBx51XELos0/scene.splinecode"
				onLoad={onLoad}
				onSplineMouseDown={onSplineMouseDown}
			/>
			
			{/* Optional: Add navigation hints */}
			<div className="absolute bottom-10 left-0 right-0 text-center">
				<p className="text-lg text-primary-300">Navigate by clicking on objects in the 3D scene</p>
			</div>
		</div>
	);
}