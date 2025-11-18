'use client'

import { Splide, SplideSlide } from '@splidejs/react-splide'
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll'
import Image from 'next/image'
import Reveal from '../shared/reveal'

export default function PartnersCarousel() {
	const options = {
		type: 'loop',
		pauseOnHover: false,
		arrows: false,
		pagination: false,
		perPage: 7,
		drag: false,
		gap: 100,
		autoScroll: {
			speed: 1,
			pauseOnHover: false,
		},
		breakpoints: {
			1024: {
				autoScroll: {
					speed: 0.5,
				},
			},
		},
	}

	return (
		<section className='bg-white/5 mt-5 px-5 border-white/20 border-y'>
			<div className='relative mx-auto py-5 container'>
				<div className='top-0 bottom-0 left-0 z-10 absolute bg-gradient-to-l from-transparent to-[#373737] w-1/12 pointer-events-none'></div>

				<Reveal>
					<Splide
						options={options}
						extensions={{ AutoScroll }}
						className='select-none'
					>
						{partners.map((partner) => (
							<SplideSlide key={partner.id}>
								<div className='relative min-h-9 aspect-video'>
									<Image
										fill
										src={partner.logo}
										alt={partner.name}
									/>
								</div>
							</SplideSlide>
						))}
					</Splide>
				</Reveal>

				<div className='top-0 right-0 bottom-0 z-10 absolute bg-gradient-to-r from-transparent to-[#373737] w-1/12 pointer-events-none'></div>
			</div>
		</section>
	)
}

const partners = [
	{
		id: 1,
		name: 'beshr',
		logo: '/partners/beshr.svg',
	},
	{
		id: 2,
		name: 'nilson',
		logo: '/partners/nilson.svg',
	},
	{
		id: 3,
		name: 'lenovo',
		logo: '/partners/lenovo.svg',
	},
	{
		id: 4,
		name: 'deerma',
		logo: '/partners/deerma.svg',
	},
	{
		id: 5,
		name: 'vileda',
		logo: '/partners/vileda.svg',
	},
	{
		id: 6,
		name: 'panasonic',
		logo: '/partners/panasonic.svg',
	},
	{
		id: 7,
		name: 'bebevit',
		logo: '/partners/bebevit.svg',
	},
]
