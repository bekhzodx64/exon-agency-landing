'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function Reveal({
	children,
	delay = 0,
	duration = 0.6,
	y = 20,
	once = true,
	className,
}) {
	const ref = useRef(null)
	const isInView = useInView(ref, { amount: 0.2, once })

	return (
		<motion.div
			ref={ref}
			initial={{ opacity: 0, y }}
			animate={isInView ? { opacity: 1, y: 0 } : {}}
			transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
			className={className}
		>
			{children}
		</motion.div>
	)
}
