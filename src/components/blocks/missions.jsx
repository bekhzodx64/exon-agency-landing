import { useTranslations } from 'next-intl'
import MissionsCard from '../shared/missions-card'

export default function Missions() {
	const t = useTranslations('Missions')

	const missionsData = [
		{
			title: t('title1'),
			description: t('description1'),
		},
		{
			title: t('title2'),
			description: t('description2'),
		},
		{
			title: t('title3'),
			description: t('description3'),
		},
		{
			title: t('title4'),
			description: t('description4'),
		},
		{
			title: t('title5'),
			description: t('description5'),
		},
		{
			title: t('title6'),
			description: t('description6'),
		},
	]

	return (
		<section
			className='py-7 md:py-14 lg:py-20 scroll-mt-[120px]'
			id='missions'
		>
			<div className='flex flex-col gap-8 md:gap-14 lg:gap-20 mx-auto px-5 container'>
				<div className='bg-clip-text bg-gradient-to-b from-[#50aa55] to-[#98f5aa] font-bold text-transparent text-3xl md:text-4xl lg:text-5xl text-center'>
					{t('title')}
				</div>

				<div className='gap-5 grid sm:grid-cols-2 lg:grid-cols-3'>
					{missionsData.map((item, index) => (
						<MissionsCard
							title={item.title}
							description={item.description}
							key={index}
						/>
					))}
				</div>
			</div>
		</section>
	)
}
