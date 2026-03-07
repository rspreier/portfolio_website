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
			<ambientLight intensity={0.7} />
			<directionalLight position={[4, 5, 3]} intensity={1.15} />
			<pointLight position={[-3.2, 2.8, 2]} intensity={0.5} color="#9f7aea" />

			<group ref={rigRef}>
				<mesh position={[0, -1.35, 0]} receiveShadow onClick={() => onNavigate('/')}>
					<boxGeometry args={[5.2, 0.2, 2.6]} />
					<meshStandardMaterial color="#151725" />
				</mesh>

				<mesh position={[0, -0.62, 0]} onClick={() => onNavigate('/')}>
					<boxGeometry args={[0.28, 1.2, 0.28]} />
					<meshStandardMaterial color="#232738" />
				</mesh>

				<mesh position={[0, 0.35, 0]} onClick={() => onNavigate('/projects')}>
					<boxGeometry args={[3.3, 2.1, 0.2]} />
					<meshStandardMaterial color="#2d2f44" metalness={0.25} roughness={0.55} />
				</mesh>

				<mesh position={[0, 0.35, 0.11]} onClick={() => onNavigate('/projects')}>
					<planeGeometry args={[2.95, 1.7]} />
					<meshStandardMaterial
						ref={screenMatRef}
						color="#0b1018"
						emissive="#7c3aed"
						emissiveIntensity={0.24}
						metalness={0.05}
						roughness={0.75}
					/>
				</mesh>

				<mesh position={[0, -1.1, 0.78]} rotation={[-0.2, 0, 0]} onClick={() => onNavigate('/contact')}>
					<boxGeometry args={[2.35, 0.12, 0.9]} />
					<meshStandardMaterial color="#1d2032" />
				</mesh>

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
					position={[0, 0.35, 0.115]}
					rotation={[0, 0, 0]}
					distanceFactor={1.68}
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
