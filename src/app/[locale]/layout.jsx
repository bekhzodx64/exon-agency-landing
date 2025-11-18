import { routing } from '@/i18n/routing'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { notFound } from 'next/navigation'

import Footer from '@/components/shared/footer'
import Header from '@/components/shared/header'
import MobileMenu from '@/components/shared/mobile-menu'
import { MobileMenuProvider } from '@/components/shared/mobile-menu-provider'
import ScrollModal from '@/components/shared/scroll-modal'
import TelegramButton from '@/components/shared/telegram-button'
import localFont from 'next/font/local'
import './globals.css'

const gilroy = localFont({
	src: [
		{
			path: './fonts/gilroy/Gilroy-Regular.ttf',
			weight: '400',
			style: 'normal',
		},
		{
			path: './fonts/gilroy/Gilroy-Medium.ttf',
			weight: '500',
			style: 'normal',
		},
		{
			path: './fonts/gilroy/Gilroy-Bold.ttf',
			weight: '700',
			style: 'normal',
		},
	],
	display: 'swap',
	subsets: ['latin'],
})

export const metadata = {
	title: 'Exon Marketing Agency',
	description: 'Exon Marketing Agency',
}

export default async function LocaleLayout({ children, params }) {
	const { locale } = await params

	if (!hasLocale(routing.locales, locale)) {
		notFound()
	}

	return (
		<html
			lang={locale}
			className='bg-accent-black scroll-smooth'
		>
			<body className={`${gilroy.className} antialiased`}>
				<NextIntlClientProvider>
					<MobileMenuProvider>
						<Header />
						<main className='mx-auto'>{children}</main>
						<Footer />
						<ScrollModal />
						<TelegramButton />
						<MobileMenu />
					</MobileMenuProvider>
				</NextIntlClientProvider>
			</body>
		</html>
	)
}
