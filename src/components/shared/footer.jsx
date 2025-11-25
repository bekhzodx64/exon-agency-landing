import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
	const t = useTranslations('Nav')
	const f = useTranslations('Footer')

	return (
		<footer className='bg-white/5 px-5 py-7'>
			<div className='mx-auto container'>
				<div className='flex sm:flex-row flex-col justify-between items-baseline gap-5'>
					<Link
						href='/'
						className='inline-block'
					>
						<Image
							src='/logo.png'
							alt='logo'
							width={150}
							height={56}
						/>
					</Link>

					<div className='flex gap-2'>
						<div className='relative size-10 aspect-square'>
							<Image
								src='/markets/uzum.jpg'
								alt='uzum'
								className='rounded-xl object-cover'
								fill
							/>
						</div>

						<div className='relative size-10 aspect-square'>
							<Image
								src='/markets/yandex.jpg'
								alt='yandex'
								className='rounded-xl object-cover'
								fill
							/>
						</div>

						<div className='relative size-10 aspect-square'>
							<Image
								src='/markets/wb.jpg'
								alt='wb'
								className='rounded-xl object-cover'
								fill
							/>
						</div>
					</div>
				</div>

				<nav className='py-7 border-white/40 border-b'>
					<ul className='flex sm:flex-row flex-col gap-7 sm:gap-14 sm:pt-14 text-18 sm:text-22'>
						<li>
							<Link href='#intro'>{t('about')}</Link>
						</li>
						<li>
							<Link href='#missions'>{t('services')}</Link>
						</li>
						<li>
							<Link href='#portfolio'>{t('portfolio')}</Link>
						</li>
						<li>
							<Link href='#contacts'>{t('contacts')}</Link>
						</li>
					</ul>
				</nav>

				<div className='pt-5'>
					<p>Exon Marketing Agency , {f('copyright')}.</p>
				</div>
			</div>
		</footer>
	)
}
