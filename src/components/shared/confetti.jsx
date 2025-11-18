'use client'
import { useEffect, useState } from 'react'

export default function Confetti({ isActive, onComplete }) {
	const [particles, setParticles] = useState([])

	useEffect(() => {
		if (isActive) {
			const newParticles = Array.from({ length: 50 }, (_, i) => ({
				id: i,
				x: Math.random() * window.innerWidth,
				y: -10,
				vx: (Math.random() - 0.5) * 8,
				vy: Math.random() * 3 + 2,
				rotation: Math.random() * 360,
				rotationSpeed: (Math.random() - 0.5) * 10,
				color: [
					'#ff6b6b',
					'#4ecdc4',
					'#45b7d1',
					'#96ceb4',
					'#feca57',
					'#ff9ff3',
					'#54a0ff',
				][Math.floor(Math.random() * 7)],
				size: Math.random() * 8 + 4,
			}))

			setParticles(newParticles)

			const interval = setInterval(() => {
				setParticles((prev) =>
					prev
						.map((particle) => ({
							...particle,
							x: particle.x + particle.vx,
							y: particle.y + particle.vy,
							rotation: particle.rotation + particle.rotationSpeed,
							vy: particle.vy + 0.1,
						}))
						.filter((particle) => particle.y < window.innerHeight + 100)
				)
			}, 16)

			const timeout = setTimeout(() => {
				setParticles([])
				onComplete?.()
			}, 3000)

			return () => {
				clearInterval(interval)
				clearTimeout(timeout)
			}
		}
	}, [isActive, onComplete])

	if (!isActive && particles.length === 0) return null

	return (
		<div className='z-50 fixed inset-0 pointer-events-none'>
			{particles.map((particle) => (
				<div
					key={particle.id}
					className='absolute rounded-full w-2 h-2'
					style={{
						left: particle.x,
						top: particle.y,
						backgroundColor: particle.color,
						transform: `rotate(${particle.rotation}deg)`,
						width: particle.size,
						height: particle.size,
						opacity: particle.y > window.innerHeight - 200 ? 0.5 : 1,
					}}
				/>
			))}
		</div>
	)
}
