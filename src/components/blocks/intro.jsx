'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'

export default function Intro() {
	const t = useTranslations('Intro')

	const decorTopRef = useRef(null)
	const decorBottomRef = useRef(null)

	return (
		<section
			className='bg-white/5 scroll-mt-24 sm:scroll-mt-28 md:scroll-mt-32'
			id='intro'
		>
			<div className='relative mx-auto px-5 pt-24 sm:pt-28 md:pt-0 pb-12 sm:pb-16 md:pb-0 overflow-y-clip container'>
				<div
					ref={decorTopRef}
					className='hidden lg:block top-0 right-1/12 -z-10 absolute'
				>
					<div className='relative w-2xl h-64'>
						<Image
							src='/decors/circle-top.png'
							fill
							alt='circle'
							priority
							className='object-scale-down'
						/>
					</div>
				</div>

				<div className='relative flex flex-col justify-start md:justify-center items-center md:min-h-dvh'>
					<div className='top-1/6 -left-5 absolute flex gap-2'>
						<div className='relative size-16 aspect-square'>
							<Image
								src='/markets/uzum.jpg'
								alt='uzum'
								className='rounded-xl object-cover'
								fill
							/>
						</div>

						<div className='relative size-16 aspect-square'>
							<Image
								src='/markets/yandex.jpg'
								alt='yandex'
								className='rounded-xl object-cover'
								fill
							/>
						</div>

						<div className='relative size-16 aspect-square'>
							<Image
								src='/markets/wb.jpg'
								alt='wb'
								className='rounded-xl object-cover'
								fill
							/>
						</div>
					</div>

					<div className='py-10 max-w-[946px] text-center'>
						{/* <h1 className='bg-clip-text bg-gradient-to-b from-[#50aa55] to-[#98f5aa] font-bold text-transparent text-2xl sm:text-3xl lg:text-4xl 2xl:text-6xl'>
							{t('title')}
						</h1> */}
						<p className='max-w-4xl font-bold text-4xl text-balance'>
							{t('description')}
						</p>
						{/* <p className='opacity-50 mt-3 md:mt-4 lg:text-20 text-sm sm:text-base md:text-lg text-balance'>
							{t('description2')}
						</p> */}
					</div>

					<div className='mt-8 md:mt-10'>
						<Link
							href='#contacts'
							className='inline-block px-9 py-3 rounded-xl lg:text-22 text-sm btn-gradient'
						>
							{t('button')}
						</Link>
					</div>
				</div>

				<div
					ref={decorBottomRef}
					className='hidden lg:block bottom-0 left-0 -z-10 absolute'
				>
					<div className='relative w-2xl h-[210px]'>
						<Image
							src='/decors/circle-bottom.png'
							fill
							alt='circle'
							priority
							className='object-scale-down'
						/>
					</div>
				</div>

				<div className='-bottom-1/8 left-1/2 -z-20 absolute bg-[#76F8A2] blur-3xl rounded-[50%] w-full h-[240px] sm:h-[320px] md:h-[400px] -translate-x-1/2 translate-y-1/2'></div>
			</div>

			<div className='-z-10 absolute inset-0 bg-black/10 backdrop-blur-sm'></div>
		</section>
	)
}
