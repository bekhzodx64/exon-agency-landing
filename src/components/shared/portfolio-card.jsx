import Image from 'next/image'

export default function PortfolioCard({ project }) {
	return (
		<div className='group relative w-full'>
			<div className='relative bg-gradient-to-br from-white/[0.15] to-transparent p-[1px] rounded-2xl'>
				<div className='relative bg-gradient-to-br from-black/80 to-black/40 backdrop-blur-xl rounded-2xl overflow-hidden'>
					<div className='relative'>
						<div className='top-0 right-0 left-0 absolute bg-gradient-to-r from-transparent via-[#50aa55] to-transparent opacity-0 group-hover:opacity-100 h-1 transition-opacity duration-700' />

						<div className='flex justify-between items-start px-4 pt-4'>
							<div className='flex items-center gap-3'>
								<div className='relative size-10 aspect-square'>
									<Image
										src={project.logo}
										alt={project.name}
										className='object-scale-down'
										fill
									/>
								</div>
								<h3 className='font-medium text-white/90 capitalize'>
									{project.name}
								</h3>
							</div>
						</div>

						<div className='mt-4 px-5'>
							<div className='relative aspect-video'>
								<Image
									src={project.logo}
									className='object-scale-down'
									alt={project.name}
									fill
									draggable={false}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
