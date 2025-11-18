import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
	const t = useTranslations('Nav')
	const f = useTranslations('Footer')

	return (
		<footer className='bg-white/5 px-5 py-7'>
			<div className='mx-auto container'>
				<Link
					href='/'
					className='inline-block'
				>
					<Image
						src='/logo.svg'
						alt='logo'
						width={150}
						height={56}
					/>
				</Link>

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
