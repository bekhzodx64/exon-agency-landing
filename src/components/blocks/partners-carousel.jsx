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
				<Reveal>
					<Splide
						options={options}
						extensions={{ AutoScroll }}
						className='select-none'
					>
						{partners.map((partner, index) => (
							<SplideSlide key={index + partner.name}>
								<div className='relative min-h-9 aspect-video'>
									<Image
										fill
										src={`/partners/${partner.name}.png`}
										alt={partner.name}
										draggable={false}
										className='object-scale-down'
									/>
								</div>
							</SplideSlide>
						))}
					</Splide>
				</Reveal>
			</div>
		</section>
	)
}

const partners = [
	{
		name: 'babitopia',
	},
	{
		name: 'bavi',
	},
	{
		name: 'beshr',
	},
	{
		name: 'bimunica',
	},
	{
		name: 'concept',
	},
	{
		name: 'deerma',
	},
	{
		name: 'frosch',
	},
	{
		name: 'grohe',
	},
	{
		name: 'hp',
	},
	{
		name: 'lenovo',
	},
	{
		name: 'lovular',
	},
	{
		name: 'panasonic',
	},
	{
		name: 'tefia',
	},
	{
		name: 'vileda',
	},
	{
		name: 'tess',
	},
	{
		name: 'emerald',
	},
]
