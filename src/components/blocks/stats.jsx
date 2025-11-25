import { useTranslations } from 'next-intl'

export default function Stats() {
	const t = useTranslations('Stats')

	return (
		<div className='mx-auto px-5 py-5 sm:py-10 lg:py-20 container'>
			<div className='relative gap-5 lg:gap-0 grid lg:grid-cols-3 2xl:bg-gradient-to-b from-transparent to-emerald-500/20 rounded-b-4xl'>
				<div className='bg-gradient-to-b from-transparent to-emerald-500/20 px-10 pt-2 pb-4 border border-emerald-400 border-t-0 rounded-b-4xl lg:rounded-br-none'>
					<h3 className='bg-clip-text bg-gradient-to-b from-[#50aa55] to-[#98f5aa] font-bold text-30 text-transparent sm:text-4xl lg:text-5xl'>
						50+
					</h3>
					<p className='lg:text-18 text-sm sm:text-base text-balance'>
						{t('description1')}
					</p>
				</div>

				<div className='relative bg-gradient-to-b from-transparent to-emerald-500/20 px-10 pt-2 pb-4 border border-emerald-400 lg:border-x-0 border-t-0 rounded-b-4xl lg:rounded-b-none'>
					<div className='hidden lg:block top-0 left-0 absolute bg-emerald-300 rounded-full size-1 -translate-x-1/2 -translate-y-1/2'></div>
					<div className='hidden lg:block top-0 right-0 absolute bg-emerald-300 rounded-full size-1 -translate-y-1/2 translate-x-1/2'></div>

					<h3 className='bg-clip-text bg-gradient-to-b from-[#50aa55] to-[#98f5aa] font-bold text-30 text-transparent sm:text-4xl lg:text-5xl'>
						15+
					</h3>
					<p className='lg:text-18 text-sm sm:text-base text-balance'>
						{t('description2')}
					</p>

					<div className='hidden lg:block bottom-0 left-0 absolute bg-emerald-300 rounded-full size-1 -translate-x-1/2 translate-y-1/2'></div>
					<div className='hidden lg:block right-0 bottom-0 absolute bg-emerald-300 rounded-full size-1 translate-x-1/2 translate-y-1/2'></div>
				</div>

				<div className='bg-gradient-to-b from-transparent to-emerald-500/20 px-10 pt-2 pb-4 border border-emerald-400 border-t-0 rounded-b-4xl lg:rounded-bl-none'>
					<h3 className='bg-clip-text bg-gradient-to-b from-[#50aa55] to-[#98f5aa] font-bold text-30 text-transparent sm:text-4xl lg:text-5xl'>
						100 000+
					</h3>
					<p className='lg:text-18 text-sm sm:text-base text-balance'>
						{t('description3')}
					</p>
				</div>

				<div className='hidden lg:block top-0 left-0 absolute bg-emerald-300 rounded-full size-1 -translate-x-1/3 -translate-y-1/2'></div>
				<div className='hidden lg:block top-0 right-0 absolute bg-emerald-300 rounded-full size-1 -translate-y-1/2 translate-x-1/3'></div>
			</div>
		</div>
	)
}
