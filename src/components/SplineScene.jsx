'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, createPortal, useFrame } from '@react-three/fiber';
import { CameraControls, Html, useGLTF } from '@react-three/drei';
import { useRouter } from 'next/navigation';
import { Box3, Vector3 } from 'three';
import { useSiteTheme } from '@/components/ThemeProvider';

function TerminalPanel({ lines, input, setInput, handleKeyDown, theme, compact = false, inputRef }) {
	const outputRef = useRef(null);
	const paletteByTheme = {
		light: {
			shellBg: 'rgba(237, 241, 246, 0.95)',
			shellBorder: 'rgba(94, 85, 129, 0.35)',
			shellShadow: '0 0 26px rgba(109,40,217,0.18)',
			lineBg: 'repeating-linear-gradient(to bottom, rgba(109,40,217,0.05) 0px, rgba(109,40,217,0.05) 1px, transparent 2px, transparent 4px)',
			headerText: 'text-primary-400',
			bodyText: 'text-gray-800',
			mutedText: 'text-gray-500',
		},
		dark: {
			shellBg: 'rgba(7, 11, 20, 0.95)',
			shellBorder: 'rgba(91, 33, 182, 0.4)',
			shellShadow: '0 0 36px rgba(124,58,237,0.35)',
			lineBg: 'repeating-linear-gradient(to bottom, rgba(124,58,237,0.06) 0px, rgba(124,58,237,0.06) 1px, transparent 2px, transparent 4px)',
			headerText: 'text-primary-300',
			bodyText: 'text-emerald-100',
			mutedText: 'text-gray-400',
		},
		retro: {
			shellBg: 'rgba(5, 14, 6, 0.97)',
			shellBorder: 'rgba(116, 255, 79, 0.45)',
			shellShadow: '0 0 40px rgba(77,224,52,0.33)',
			lineBg: 'repeating-linear-gradient(to bottom, rgba(167,255,118,0.11) 0px, rgba(167,255,118,0.11) 1px, transparent 2px, transparent 3px)',
			headerText: 'text-primary-300',
			bodyText: 'text-primary-200',
			mutedText: 'text-primary-700',
		},
	};
	const palette = paletteByTheme[theme] || paletteByTheme.light;
	const retroGlowClass = theme === 'retro' ? 'terminal-retro-glow' : '';
	const inputTextClassByTheme = {
		light: 'text-gray-800 placeholder:text-gray-500',
		dark: 'text-emerald-100 placeholder:text-gray-500',
		retro: 'text-primary-200 placeholder:text-primary-700',
	};
	const inputTextClass = inputTextClassByTheme[theme] || inputTextClassByTheme.light;

	useEffect(() => {
		if (outputRef.current) {
			outputRef.current.scrollTop = outputRef.current.scrollHeight;
		}
	}, [lines]);

	return (
		<div
			className={`${compact ? 'h-[220px] w-[390px] text-[13px]' : 'h-[395px] w-[690px] text-[17px]'} overflow-hidden rounded-md border ${retroGlowClass}`}
			style={{
				backgroundColor: palette.shellBg,
				borderColor: palette.shellBorder,
				boxShadow: palette.shellShadow,
			}}
		>
			<div className="flex items-center justify-between border-b border-primary-700/40 px-4 py-2">
				<p className={`text-xs uppercase tracking-[0.25em] ${palette.headerText}`}>Terminal</p>
				<p className={`text-xs ${palette.mutedText}`}>Ready</p>
			</div>
			<div
				ref={outputRef}
				className={`${compact ? 'h-[150px] text-[14px] leading-6' : 'h-[300px] text-[18px] leading-8'} overflow-y-auto px-4 py-3 font-mono`}
				style={{
					backgroundImage: palette.lineBg
				}}
			>
				{lines.map((line, index) => (
					<p key={`${line}-${index}`} className={`break-words ${palette.bodyText}`}>
						{line}
					</p>
				))}
			</div>
			<div className={`${compact ? 'text-[14px] py-2' : 'text-[18px] py-3'} border-t border-primary-700/40 px-4 font-mono`}>
				<div className={`flex items-center gap-2 ${palette.bodyText}`}>
					<span className={palette.headerText}>&gt;</span>
					<input
						ref={inputRef}
						type="text"
						value={input}
						onChange={(e) => setInput(e.target.value)}
						onKeyDown={handleKeyDown}
						placeholder='Type "help"'
						className={`w-full bg-transparent ${inputTextClass} outline-none`}
						aria-label="Terminal command input"
						autoComplete="off"
						spellCheck={false}
					/>
					<span className={`${palette.headerText} animate-pulse`}>_</span>
				</div>
			</div>
		</div>
	);
}

function ComputerScene({ onNavigate, lines, input, setInput, handleKeyDown, theme, isZoomed, onMonitorClick, inputRef }) {
	const rigRef = useRef(null);
	const { scene } = useGLTF('/models/office_desk.glb');
	const { model, normalizedScale } = useMemo(() => {
		const nextModel = scene.clone(true);
		const box = new Box3().setFromObject(nextModel);
		const size = new Vector3();
		const center = new Vector3();
		box.getSize(size);
		box.getCenter(center);

		const maxDim = Math.max(size.x, size.y, size.z) || 1;
		const targetDim = 4.2;
		const scale = targetDim / maxDim;

		nextModel.position.sub(center);
		return {
			model: nextModel,
			normalizedScale: scale,
		};
	}, [scene]);
	const baseYRotation = -Math.PI / 2;
	const sceneBackgroundByTheme = {
		light: '#dfe4ea',
		dark: '#06060a',
		retro: '#081108',
	};
	const sceneBackground = sceneBackgroundByTheme[theme] || sceneBackgroundByTheme.light;
	const modelTransformByTheme = {
		light: { position: [0, -0.95, 0], scale: normalizedScale },
		dark: { position: [0, -0.95, 0], scale: normalizedScale },
		retro: { position: [0, -0.95, 0], scale: normalizedScale },
	};
	const modelTransform = modelTransformByTheme[theme] || modelTransformByTheme.light;

	const monitorMount = useMemo(() => {
		const monitorNode = model.getObjectByName('monitor1228A6_StaticMeshComponent0');
		return monitorNode || null;
	}, [model]);

	useFrame((state) => {
		const t = state.clock.getElapsedTime();
		if (rigRef.current && !isZoomed) {
			rigRef.current.position.y = modelTransform.position[1] + Math.sin(t * 0.9) * 0.015;
			rigRef.current.rotation.y = baseYRotation + Math.sin(t * 0.45) * 0.03;
			rigRef.current.rotation.x = Math.sin(t * 0.55) * 0.008;
		}
	});

	return (
		<>
			<color attach="background" args={[sceneBackground]} />
			<hemisphereLight intensity={0.9} groundColor="#1a1f2a" />
			<directionalLight position={[4.4, 6.2, 3.2]} intensity={1.1} />
			<pointLight position={[-4.4, 2.1, -3.8]} intensity={0.42} color={theme === 'retro' ? '#5be038' : '#9f7aea'} />
			<pointLight position={[3.4, 1.7, 2.3]} intensity={0.38} color="#f4f1ff" />

			<group
				ref={rigRef}
				position={modelTransform.position}
				scale={modelTransform.scale}
				rotation={[0, baseYRotation, 0]}
			>
				<primitive
					object={model}
					onClick={(e) => {
						e.stopPropagation();
						const isMonitor =
							e.object.name === 'monitor1228A6_StaticMeshComponent0' ||
							e.object.parent?.name === 'monitor1228A6_StaticMeshComponent0';
						if (isMonitor && !isZoomed) {
							const pos = new Vector3();
							e.object.getWorldPosition(pos);
							onMonitorClick(pos);
						}
					}}
				/>

				{monitorMount
					? createPortal(
						<Html
							transform
							occlude
							position={[0, 0.02, 0.055]}
							rotation={[0, 0, 0]}
							distanceFactor={isZoomed ? 0.34 : 0.56}
							style={{ pointerEvents: 'auto' }}
						>
							<TerminalPanel
								lines={lines}
								input={input}
								setInput={setInput}
								handleKeyDown={handleKeyDown}
								theme={theme}
								compact={!isZoomed}
								inputRef={inputRef}
							/>
						</Html>,
						monitorMount
					)
					: (
						<Html transform occlude position={[0, 1.1, 0.2]} distanceFactor={1.2} style={{ pointerEvents: 'auto' }}>
							<TerminalPanel
								lines={lines}
								input={input}
								setInput={setInput}
								handleKeyDown={handleKeyDown}
								theme={theme}
								compact={!isZoomed}
								inputRef={inputRef}
							/>
						</Html>
					)}
			</group>
		</>
	);
}

export default function SplineScene() {
	const router = useRouter();
	const { theme, setTheme, availableThemes } = useSiteTheme();
	const [input, setInput] = useState('');
	const [lines, setLines] = useState([
		'Portfolio Terminal v1.0',
		'Type "help" to view available commands.'
	]);
	const [history, setHistory] = useState([]);
	const [historyIndex, setHistoryIndex] = useState(-1);
	const [isZoomed, setIsZoomed] = useState(false);
	const cameraControlsRef = useRef(null);
	const inputRef = useRef(null);

	function handleNavigate(destination) {
		setTimeout(() => {
			router.push(destination);
		}, 200);
	}

	function pushLine(nextLine) {
		setLines((prev) => [...prev, nextLine]);
	}

	function zoomIn(monitorWorldPos) {
		cameraControlsRef.current?.setLookAt(
			monitorWorldPos.x, monitorWorldPos.y + 0.05, monitorWorldPos.z + 1.5,
			monitorWorldPos.x, monitorWorldPos.y, monitorWorldPos.z,
			true
		);
		setIsZoomed(true);
		setTimeout(() => inputRef.current?.focus(), 600);
	}

	function zoomOut() {
		cameraControlsRef.current?.setLookAt(
			2.1, 1.3, 3.8,
			1.1, 0.72, 0.05,
			true
		);
		setIsZoomed(false);
	}

	useEffect(() => {
		const onKey = (e) => { if (e.key === 'Escape' && isZoomed) zoomOut(); };
		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	}, [isZoomed]);

	function runCommand(rawCommand) {
		const command = rawCommand.trim().toLowerCase();
		if (!command) return;

		pushLine(`> ${rawCommand}`);

		if (command === 'clear') {
			setLines([]);
			return;
		}

		if (command === 'help') {
			pushLine('Commands: help, about, projects, contact, home, clear, theme, theme <light|dark|retro>');
			return;
		}

		if (command === 'theme') {
			pushLine(`Current theme: ${theme}`);
			pushLine(`Available themes: ${availableThemes.join(', ')}`);
			return;
		}

		if (command.startsWith('theme ')) {
			const nextTheme = command.split(/\s+/)[1];
			if (!availableThemes.includes(nextTheme)) {
				pushLine(`Invalid theme: ${nextTheme}. Use: ${availableThemes.join(', ')}`);
				return;
			}
			setTheme(nextTheme);
			pushLine(`Theme switched to: ${nextTheme}`);
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
		<div className="relative w-full h-full" style={{ touchAction: 'none' }}>
			<Canvas camera={{ position: [2.1, 1.3, 3.8], fov: 38 }}>
				<ComputerScene
					onNavigate={handleNavigate}
					lines={lines}
					input={input}
					setInput={setInput}
					handleKeyDown={handleKeyDown}
					theme={theme}
					isZoomed={isZoomed}
					onMonitorClick={zoomIn}
					inputRef={inputRef}
				/>
				<CameraControls
					ref={cameraControlsRef}
					smoothTime={0.35}
					minDistance={isZoomed ? 0.3 : 3.2}
					maxDistance={isZoomed ? 2.5 : 8.5}
					minPolarAngle={Math.PI / 3.8}
					maxPolarAngle={Math.PI / 1.8}
					minAzimuthAngle={isZoomed ? -Math.PI / 12 : -Math.PI / 1.3}
					maxAzimuthAngle={isZoomed ? Math.PI / 12 : Math.PI / 1.3}
				/>
			</Canvas>

			{isZoomed && (
				<button
					onClick={zoomOut}
					className="absolute top-6 left-6 z-10 px-4 py-2 rounded border border-primary-500/60 text-primary-300 text-sm backdrop-blur-sm bg-dark/70 hover:bg-primary-900/50 transition-all"
				>
					← Back
				</button>
			)}

			<div className="absolute bottom-10 left-0 right-0 text-center pointer-events-none">
				<p className="text-lg text-primary-300">
					{isZoomed
						? 'Type commands · ESC or Back to return'
						: 'Click the computer to zoom in · or type "help"'}
				</p>
			</div>
		</div>
	);
}

useGLTF.preload('/models/office_desk.glb');
