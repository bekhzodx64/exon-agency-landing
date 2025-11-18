'use client'

import {
	CameraIcon,
	ChartBarIcon,
	ChartPieIcon,
	ClipboardDocumentCheckIcon,
	PaintBrushIcon,
	PencilSquareIcon,
	UserCircleIcon,
	UsersIcon,
} from '@heroicons/react/24/outline'
import { useTranslations } from 'next-intl'

export default function Team() {
	const t = useTranslations('Team')

	const teamData = [
		{
			role: t('profTitle1'),
			icon: UserCircleIcon,
			description: t('profDescription1'),
		},
		{
			role: t('profTitle2'),
			icon: ChartBarIcon,
			description: t('profDescription2'),
		},
		{
			role: t('profTitle3'),
			icon: UsersIcon,
			description: t('profDescription3'),
		},
		{
			role: t('profTitle4'),
			icon: PaintBrushIcon,
			description: t('profDescription4'),
		},
		{
			role: t('profTitle5'),
			icon: CameraIcon,
			description: t('profDescription5'),
		},
		{
			role: t('profTitle6'),
			icon: PencilSquareIcon,
			description: t('profDescription6'),
		},
		{
			role: t('profTitle7'),
			icon: ChartPieIcon,
			description: t('profDescription7'),
		},
		{
			role: t('profTitle8'),
			icon: ClipboardDocumentCheckIcon,
			description: t('profDescription8'),
		},
	]

	return (
		<section
			className='pb-20 sm:pb-24 md:pb-28'
			id='team'
		>
			<div className='mx-auto px-5 container'>
				<div className='mb-12 md:mb-16 text-center'>
					<h2 className='bg-clip-text bg-gradient-to-b from-[#50aa55] to-[#98f5aa] font-bold text-transparent text-2xl sm:text-3xl lg:text-5xl'>
						{t('title')}
					</h2>
					<p className='mx-auto mt-3 max-w-2xl text-white/70'>
						{t('description')}
					</p>
				</div>

				<div className='gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-auto'>
					{teamData.map((member) => (
						<div
							key={member.role}
							className='group bg-white/5 hover:bg-white/10 backdrop-blur-sm p-5 border border-white/10 hover:border-[#76F8A2]/30 rounded-lg transition-all duration-300'
						>
							<div className='flex items-start gap-3'>
								<div className='mt-1'>
									<member.icon className='w-5 h-5 text-[#76F8A2] group-hover:scale-110 transition-transform' />
								</div>
								<div>
									<div className='mb-2 font-bold text-[#76F8A2] text-lg transition-transform group-hover:translate-x-1'>
										{member.role}
									</div>
									<span className='block font-medium text-white/70 text-sm'>
										{member.description}
									</span>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* <div className='-z-10 absolute inset-0'>
				<div className='absolute inset-0 bg-gradient-to-b from-black/0 via-[#76F8A2]/5 to-black/0'></div>
			</div> */}
		</section>
	)
}
