import Image from 'next/image'
import Link from 'next/link'

export default function TelegramButton() {
	return (
		<div className='right-5 bottom-5 fixed rounded-full'>
			<Link
				href='https://t.me/exon_marketing_support'
				target='_blank'
			>
				<Image
					src='/icons/telegram-icon.svg'
					alt='telegram'
					width={48}
					height={48}
					className='animate-bounce cursor-pointer'
				/>
			</Link>
		</div>
	)
}
