import { useTranslations } from 'next-intl'
import PortfolioCard from '../shared/portfolio-card'

const portfolioProjects = [
	{
		name: 'babitopia',
		logo: '/partners/logo/Babitopia.png',
	},
	{
		name: 'bavi',
		logo: '/partners/logo/Bavi.png',
	},
	{
		name: 'beshr',
		logo: '/partners/logo/beshr.png',
	},
	{
		name: 'bimunica',
		logo: '/partners/logo/Bimunica.png',
	},
	{
		name: 'concept',
		logo: '/partners/logo/concept.png',
	},
	{
		name: 'deerma',
		logo: '/partners/logo/Deerma.png',
	},
	{
		name: 'frosch',
		logo: '/partners/logo/frosch.png',
	},
	{
		name: 'grohe',
		logo: '/partners/logo/Grohe-logo.png',
	},
	{
		name: 'hp',
		logo: '/partners/logo/HP.png',
	},
	{
		name: 'lenovo',
		logo: '/partners/logo/lenovo.png',
	},
	{
		name: 'lovular',
		logo: '/partners/logo/lovular.png',
	},
	{
		name: 'panasonic',
		logo: '/partners/logo/panasonic.png',
	},
	{
		name: 'tefia',
		logo: '/partners/logo/Tefia.png',
	},
	{
		name: 'vileda',
		logo: '/partners/logo/vileda.png',
	},
]

export default function Portfolio() {
	const t = useTranslations('Portfolio')

	return (
		<section
			className='bg-white/5 px-5 py-5 dfdf:py-14 scroll-mt-[120px]'
			id='portfolio'
		>
			<div className='gap-5 grid mx-auto container'>
				<div className='bg-clip-text bg-gradient-to-b from-[#50aa55] to-[#98f5aa] font-bold text-transparent text-3xl md:text-4xl lg:text-5xl text-center'>
					{t('title')}
				</div>

				<div className='place-items-center gap-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
					{portfolioProjects.map((project, index) => (
						<PortfolioCard
							key={index}
							project={project}
						/>
					))}
				</div>
			</div>
		</section>
	)
}
