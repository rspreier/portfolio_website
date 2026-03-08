'use client';

import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, OrbitControls } from '@react-three/drei';
import { useRouter } from 'next/navigation';

function TerminalPanel({ lines, input, setInput, handleKeyDown }) {
	const outputRef = useRef(null);

	useEffect(() => {
		if (outputRef.current) {
			outputRef.current.scrollTop = outputRef.current.scrollHeight;
		}
	}, [lines]);

	return (
		<div className="h-[395px] w-[690px] overflow-hidden rounded-md border border-primary-600/40 bg-[#070b14]/95 text-[17px] text-emerald-100 shadow-[0_0_36px_rgba(124,58,237,0.35)]">
			<div className="flex items-center justify-between border-b border-primary-700/40 px-4 py-2">
				<p className="text-xs uppercase tracking-[0.25em] text-primary-300">Terminal</p>
				<p className="text-xs text-gray-400">Ready</p>
			</div>
			<div
				ref={outputRef}
				className="h-[300px] overflow-y-auto px-4 py-3 font-mono text-[18px] leading-8"
				style={{
					backgroundImage:
						'repeating-linear-gradient(to bottom, rgba(124,58,237,0.06) 0px, rgba(124,58,237,0.06) 1px, transparent 2px, transparent 4px)'
				}}
			>
				{lines.map((line, index) => (
					<p key={`${line}-${index}`} className="break-words text-emerald-100">
						{line}
					</p>
				))}
			</div>
			<div className="border-t border-primary-700/40 px-4 py-3 font-mono text-[18px]">
				<div className="flex items-center gap-2 text-emerald-100">
					<span className="text-primary-300">&gt;</span>
					<input
						type="text"
						value={input}
						onChange={(e) => setInput(e.target.value)}
						onKeyDown={handleKeyDown}
						placeholder='Type "help"'
						className="w-full bg-transparent text-emerald-100 placeholder:text-gray-500 outline-none"
						aria-label="Terminal command input"
						autoComplete="off"
						spellCheck={false}
					/>
					<span className="text-primary-300 animate-pulse">_</span>
				</div>
			</div>
		</div>
	);
}

function ComputerScene({ onNavigate, lines, input, setInput, handleKeyDown }) {
	const rigRef = useRef(null);
	const screenMatRef = useRef(null);

	useFrame((state) => {
		const t = state.clock.getElapsedTime();
		if (rigRef.current) {
			rigRef.current.position.y = Math.sin(t * 0.9) * 0.08;
			rigRef.current.rotation.y = Math.sin(t * 0.45) * 0.08;
			rigRef.current.rotation.x = Math.sin(t * 0.55) * 0.02;
		}
		if (screenMatRef.current) {
			screenMatRef.current.emissiveIntensity = 0.22 + Math.sin(t * 1.4) * 0.08;
		}
	});

	return (
		<>
			<color attach="background" args={['#06060a']} />
			<ambientLight intensity={0.82} />
			<directionalLight position={[4, 5, 3]} intensity={1.2} />
			<pointLight position={[-3.2, 2.8, 2]} intensity={0.58} color="#9f7aea" />
			<pointLight position={[2.8, 2.4, 2.2]} intensity={0.42} color="#f4f1ff" />

			<group ref={rigRef}>
				{/* Desk top + lower trim */}
				<mesh position={[0, -1.28, 0]} receiveShadow onClick={() => onNavigate('/')}>
					<boxGeometry args={[5.9, 0.16, 3.2]} />
					<meshStandardMaterial color="#664532" roughness={0.92} metalness={0.04} />
				</mesh>
				<mesh position={[0, -1.38, 0]}>
					<boxGeometry args={[5.94, 0.06, 3.24]} />
					<meshStandardMaterial color="#553725" roughness={0.88} />
				</mesh>
				<mesh position={[0, -1.41, 1.57]}>
					<boxGeometry args={[5.94, 0.02, 0.06]} />
					<meshStandardMaterial color="#8a634d" roughness={0.78} />
				</mesh>
				<mesh position={[-2.84, -1.73, 0]}>
					<boxGeometry args={[0.08, 0.56, 3.14]} />
					<meshStandardMaterial color="#4a3021" roughness={0.9} />
				</mesh>
				<mesh position={[2.84, -1.73, 0]}>
					<boxGeometry args={[0.08, 0.56, 3.14]} />
					<meshStandardMaterial color="#4a3021" roughness={0.9} />
				</mesh>

				{/* Monitor stand + base */}
				<mesh position={[0, -0.56, -0.03]} onClick={() => onNavigate('/')}>
					<boxGeometry args={[0.21, 1.15, 0.19]} />
					<meshStandardMaterial color="#edf1f7" metalness={0.12} roughness={0.25} />
				</mesh>
				<mesh position={[0, -1.05, 0.09]} onClick={() => onNavigate('/')}>
					<cylinderGeometry args={[0.58, 0.7, 0.07, 42]} />
					<meshStandardMaterial color="#f5f7fb" metalness={0.1} roughness={0.32} />
				</mesh>
				<mesh position={[0, -1.01, 0.18]} onClick={() => onNavigate('/')}>
					<cylinderGeometry args={[0.38, 0.45, 0.06, 42]} />
					<meshStandardMaterial color="#e7ebf2" metalness={0.1} roughness={0.4} />
				</mesh>

				{/* Monitor body */}
				<mesh position={[0, 0.34, -0.03]} onClick={() => onNavigate('/projects')}>
					<boxGeometry args={[3.5, 2.22, 0.26]} />
					<meshStandardMaterial color="#f8f9fc" metalness={0.08} roughness={0.28} />
				</mesh>
				<mesh position={[0, 0.34, -0.12]} onClick={() => onNavigate('/projects')}>
					<boxGeometry args={[3.2, 1.95, 0.12]} />
					<meshStandardMaterial color="#e9edf4" metalness={0.08} roughness={0.35} />
				</mesh>
				<mesh position={[0, 0.33, 0.102]}>
					<planeGeometry args={[3.12, 1.86]} />
					<meshStandardMaterial color="#dbe1eb" roughness={0.4} metalness={0.05} />
				</mesh>
				<mesh position={[0, 0.33, 0.108]} onClick={() => onNavigate('/projects')}>
					<planeGeometry args={[2.92, 1.66]} />
					<meshStandardMaterial
						ref={screenMatRef}
						color="#0b1018"
						emissive="#7c3aed"
						emissiveIntensity={0.24}
						metalness={0.05}
						roughness={0.75}
					/>
				</mesh>
				<mesh position={[0, -0.58, 0.1]}>
					<sphereGeometry args={[0.02, 18, 18]} />
					<meshStandardMaterial color="#7c3aed" emissive="#7c3aed" emissiveIntensity={0.45} />
				</mesh>

				{/* Keyboard (slim low-profile) */}
				<group position={[0.05, -1.13, 1.12]} rotation={[-0.14, 0, 0]} onClick={() => onNavigate('/contact')}>
					<mesh>
						<boxGeometry args={[2.52, 0.06, 0.86]} />
						<meshStandardMaterial color="#f5f7fb" roughness={0.3} metalness={0.08} />
					</mesh>
					<mesh position={[0, 0.019, 0.02]}>
						<boxGeometry args={[2.36, 0.02, 0.72]} />
						<meshStandardMaterial color="#e8edf5" roughness={0.45} />
					</mesh>
					{[-0.22, -0.1, 0.02, 0.14, 0.26].map((z, rowIdx) => (
						<mesh key={`keyline-${rowIdx}`} position={[0, 0.031, z]}>
							<boxGeometry args={[2.22, 0.008, 0.075]} />
							<meshStandardMaterial color="#d8deea" roughness={0.65} />
						</mesh>
					))}
					<mesh position={[0, 0.032, 0.29]}>
						<boxGeometry args={[1.25, 0.009, 0.08]} />
						<meshStandardMaterial color="#d2d9e6" roughness={0.62} />
					</mesh>
				</group>

				{/* Mouse pad + low-profile mouse */}
				<mesh position={[2.02, -1.16, 0.9]} rotation={[-0.18, -0.1, 0]}>
					<cylinderGeometry args={[0.42, 0.42, 0.012, 30]} />
					<meshStandardMaterial color="#202636" roughness={0.92} />
				</mesh>
				<group position={[2.02, -1.08, 0.9]} rotation={[-0.18, -0.1, 0]}>
					<mesh scale={[1.05, 0.58, 1.35]}>
						<sphereGeometry args={[0.18, 26, 20]} />
						<meshStandardMaterial color="#f7f9fd" roughness={0.3} metalness={0.08} />
					</mesh>
					<mesh position={[0, 0.062, 0]} scale={[0.82, 0.4, 1.02]}>
						<sphereGeometry args={[0.16, 22, 20]} />
						<meshStandardMaterial color="#eef2f8" roughness={0.35} metalness={0.05} />
					</mesh>
					<mesh position={[0, 0.072, 0.005]}>
						<boxGeometry args={[0.022, 0.05, 0.12]} />
						<meshStandardMaterial color="#cfd6e3" roughness={0.58} />
					</mesh>
				</group>

				<mesh position={[-1.18, 1.1, 0.18]} onClick={() => onNavigate('/about')}>
					<boxGeometry args={[0.55, 0.14, 0.12]} />
					<meshStandardMaterial color="#7c3aed" emissive="#7c3aed" emissiveIntensity={0.55} />
				</mesh>
				<mesh position={[0, 1.1, 0.18]} onClick={() => onNavigate('/projects')}>
					<boxGeometry args={[0.55, 0.14, 0.12]} />
					<meshStandardMaterial color="#7c3aed" emissive="#7c3aed" emissiveIntensity={0.55} />
				</mesh>
				<mesh position={[1.18, 1.1, 0.18]} onClick={() => onNavigate('/contact')}>
					<boxGeometry args={[0.55, 0.14, 0.12]} />
					<meshStandardMaterial color="#7c3aed" emissive="#7c3aed" emissiveIntensity={0.55} />
				</mesh>

				<Html
					transform
					occlude
					position={[0, 0.35, 0.125]}
					rotation={[0, 0, 0]}
					distanceFactor={1.72}
					style={{ pointerEvents: 'auto' }}
				>
					<TerminalPanel lines={lines} input={input} setInput={setInput} handleKeyDown={handleKeyDown} />
				</Html>
			</group>
		</>
	);
}

export default function SplineScene() {
	const router = useRouter();
	const [input, setInput] = useState('');
	const [lines, setLines] = useState([
		'Portfolio Terminal v1.0',
		'Type "help" to view available commands.'
	]);
	const [history, setHistory] = useState([]);
	const [historyIndex, setHistoryIndex] = useState(-1);

	function handleNavigate(destination) {
		setTimeout(() => {
			router.push(destination);
		}, 200);
	}

	function pushLine(nextLine) {
		setLines((prev) => [...prev, nextLine]);
	}

	function runCommand(rawCommand) {
		const command = rawCommand.trim().toLowerCase();
		if (!command) return;

		pushLine(`> ${rawCommand}`);

		if (command === 'clear') {
			setLines([]);
			return;
		}

		if (command === 'help') {
			pushLine('Commands: help, about, projects, contact, home, clear');
			return;
		}

		const commandRouteMap = {
			about: '/about',
			projects: '/projects',
			contact: '/contact',
			home: '/'
		};

		const destination = commandRouteMap[command];
		if (destination) {
			pushLine(`Navigating to ${destination} ...`);
			handleNavigate(destination);
			return;
		}

		pushLine(`Command not found: ${command}. Type "help".`);
	}

	function handleKeyDown(e) {
		if (e.key === 'Enter') {
			e.preventDefault();
			const nextCommand = input;
			if (!nextCommand.trim()) return;
			setHistory((prev) => [...prev, nextCommand]);
			setHistoryIndex(-1);
			setInput('');
			runCommand(nextCommand);
			return;
		}

		if (e.key === 'ArrowUp') {
			e.preventDefault();
			if (history.length === 0) return;
			const nextIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
			setHistoryIndex(nextIndex);
			setInput(history[nextIndex]);
			return;
		}

		if (e.key === 'ArrowDown') {
			e.preventDefault();
			if (history.length === 0) return;
			if (historyIndex <= 0) {
				setHistoryIndex(-1);
				setInput('');
				return;
			}
			const nextIndex = historyIndex + 1;
			setHistoryIndex(nextIndex);
			setInput(history[nextIndex]);
		}
	}

	return (
		<div className="w-full h-full">
			<Canvas camera={{ position: [0, 0.75, 5.6], fov: 42 }}>
				<ComputerScene
					onNavigate={handleNavigate}
					lines={lines}
					input={input}
					setInput={setInput}
					handleKeyDown={handleKeyDown}
				/>
				<OrbitControls
					enablePan={false}
					enableZoom={false}
					minPolarAngle={Math.PI / 2.6}
					maxPolarAngle={Math.PI / 2.15}
					minAzimuthAngle={-0.32}
					maxAzimuthAngle={0.32}
				/>
			</Canvas>

			<div className="absolute bottom-10 left-0 right-0 text-center">
				<p className="text-lg text-primary-300">Use terminal commands or click the 3D computer to navigate</p>
			</div>
		</div>
	);
}
