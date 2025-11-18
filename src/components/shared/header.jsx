'use client'

import Image from 'next/image'
import Link from 'next/link'

import { routing } from '@/i18n/routing'
import { useLocale, useTranslations } from 'next-intl'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import LocaleSwitcherSelect from './locale-switcher-select'
import { useMobileMenu } from './mobile-menu-provider'

const MobileMenu = dynamic(() => import('./mobile-menu'), { ssr: false })

export default function Header() {
	const t = useTranslations('Nav')
	const locale = useLocale()
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const { openMenu, closeMenu, isOpen } = useMobileMenu()

	useEffect(() => {
		// keep local and context in sync in case both are used
		if (isOpen !== isMenuOpen) setIsMenuOpen(isOpen)
	}, [isOpen])

	return (
		<header className='top-0 right-0 left-0 z-30 fixed bg-white/5 backdrop-blur-md px-5 py-5 md:py-8'>
			<div className='flex justify-between items-center mx-auto container'>
				<Link
					href='/'
					className='inline-block relative w-32 lg:w-[150px] h-14 lg:h-14'
				>
					<Image
						src='/logo.svg'
						alt='logo'
						fill
					/>
				</Link>

				<nav className='hidden md:block'>
					<ul className='flex justify-between items-center gap-6 lg:gap-16 bg-white/10 px-5 lg:px-8 py-3 lg:py-3 border border-white/10 rounded-full text-18 lg:text-20'>
						<li>
							<Link
								href='#intro'
								className='nav-link'
							>
								{t('about')}
							</Link>
						</li>
						<li>
							<Link
								href='#missions'
								className='nav-link'
							>
								{t('services')}
							</Link>
						</li>
						<li>
							<Link
								href='#portfolio'
								className='nav-link'
							>
								{t('portfolio')}
							</Link>
						</li>
						<li>
							<Link
								href='#contacts'
								className='nav-link'
							>
								{t('contacts')}
							</Link>
						</li>
					</ul>
				</nav>

				<div className='flex items-center gap-4 sm:gap-8'>
					<LocaleSwitcherSelect defaultValue={locale}>
						{routing.locales.map((cur) => (
							<option
								key={cur}
								value={cur}
								className='text-black cursor-pointer'
							>
								{cur}
							</option>
						))}
					</LocaleSwitcherSelect>

					<Link
						href='/'
						className='hidden px-9 py-3 rounded-xl text-22 btn-gradient'
					>
						Ariza qoldirish
					</Link>

					<button
						type='button'
						className='md:hidden flex justify-center items-center rounded-full size-12 btn-gradient'
						onClick={() => {
							setIsMenuOpen(true)
							openMenu()
						}}
					>
						<Image
							src='/icons/hamburger-icon.svg'
							width={14}
							height={9}
							alt='hamburger icon'
						/>
					</button>
				</div>
			</div>
		</header>
	)
}
