'use client'

import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import { useMobileMenu } from './mobile-menu-provider'

export default function MobileMenu() {
	const t = useTranslations('Nav')
	const locale = useLocale()
	const { isOpen, closeMenu } = useMobileMenu()

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = ''
		}
		return () => {
			document.body.style.overflow = ''
		}
	}, [isOpen])

	if (!isOpen) return null

	const handleBackdropClick = (e) => {
		if (e.target === e.currentTarget) closeMenu()
	}

	const handleLinkClick = () => closeMenu()

	return (
		<div
			className='md:hidden z-50 fixed inset-0 bg-black/50 backdrop-blur-sm animate-fadeIn'
			onClick={handleBackdropClick}
			role='dialog'
			aria-modal='true'
		>
			<div className='top-0 right-0 bottom-0 absolute flex flex-col gap-6 bg-[#373737] p-6 border-white/20 border-l rounded-l-2xl w-full sm:w-[88%] max-w-sm overflow-y-auto animate-slideUp'>
				<div className='flex justify-between items-center'>
					<Link
						href='/'
						onClick={handleLinkClick}
						className='inline-block relative w-28 h-10'
					>
						<Image
							src='/logo.svg'
							alt='logo'
							fill
						/>
					</Link>
					<button
						type='button'
						onClick={closeMenu}
						aria-label='Close menu'
						className='flex justify-center items-center rounded-full size-10 btn-gradient'
					>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 24 24'
							fill='none'
							stroke='white'
							strokeWidth='2'
							className='w-5 h-5'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M6 6l12 12M18 6L6 18'
							/>
						</svg>
					</button>
				</div>

				<nav>
					<ul className='flex flex-col gap-5 text-18 sm:text-22'>
						<li>
							<Link
								href='#intro'
								onClick={handleLinkClick}
								className='block py-2 nav-link'
							>
								{t('about')}
							</Link>
						</li>
						<li>
							<Link
								href='#missions'
								onClick={handleLinkClick}
								className='block py-2 nav-link'
							>
								{t('services')}
							</Link>
						</li>
						<li>
							<Link
								href='#portfolio'
								onClick={handleLinkClick}
								className='block py-2 nav-link'
							>
								{t('portfolio')}
							</Link>
						</li>
						<li>
							<Link
								href='#contacts'
								onClick={handleLinkClick}
								className='block py-2 nav-link'
							>
								{t('contacts')}
							</Link>
						</li>
					</ul>
				</nav>

				<div className='flex justify-between items-center gap-4 pt-2'>
					<Link
						href='#contacts'
						onClick={handleLinkClick}
						className='inline-block px-6 py-3 rounded-xl text-18 btn-gradient'
					>
						Ariza qoldirish
					</Link>
				</div>
			</div>
		</div>
	)
}
