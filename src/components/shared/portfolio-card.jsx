import Image from 'next/image'

export default function PortfolioCard({ project }) {
	return (
		<div className='relative w-full max-w-xs aspect-video'>
			<Image
				src={project.logo}
				className='object-scale-down'
				alt={project.name}
				fill
				draggable={false}
			/>
		</div>
	)
}
