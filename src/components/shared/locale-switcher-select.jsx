'use client'

import { usePathname, useRouter } from '@/i18n/navigation'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import {
	Children,
	useEffect,
	useMemo,
	useRef,
	useState,
	useTransition,
} from 'react'

export default function LocaleSwitcherSelect({
	children,
	defaultValue,
	label,
}) {
	const router = useRouter()
	const [isPending, startTransition] = useTransition()
	const pathname = usePathname()
	const params = useParams()

	const containerRef = useRef(null)
	const [isOpen, setIsOpen] = useState(false)
	const [selectedValue, setSelectedValue] = useState(defaultValue)

	const items = useMemo(() => {
		return Children.toArray(children)
			.filter(Boolean)
			.map((child) => {
				if (typeof child !== 'object' || child === null) return null
				const element = child
				return {
					value: element.props?.value,
					label: element.props?.children ?? element.props?.value,
				}
			})
			.filter(Boolean)
	}, [children])

	useEffect(() => {
		setSelectedValue(defaultValue)
	}, [defaultValue])

	useEffect(() => {
		function handleClickOutside(event) {
			if (!containerRef.current) return
			if (!containerRef.current.contains(event.target)) {
				setIsOpen(false)
			}
		}
		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [])

	function selectLocale(nextLocale) {
		if (!nextLocale || nextLocale === selectedValue) {
			setIsOpen(false)
			return
		}
		setSelectedValue(nextLocale)
		setIsOpen(false)
		startTransition(() => {
			router.replace(
				{ pathname, params },
				{ locale: nextLocale, scroll: false }
			)
		})
	}

	const selectedItem =
		items.find((it) => it.value === selectedValue) || items[0]

	const localeToFlagSrc = {
		ru: '/icons/flag-ru.svg',
		uz: '/icons/flag-uz.svg',
	}

	function getFlagSrc(value) {
		return localeToFlagSrc[value]
	}

	return (
		<div
			ref={containerRef}
			className='relative select-none'
		>
			<button
				type='button'
				aria-haspopup='listbox'
				aria-expanded={isOpen}
				disabled={isPending}
				onClick={() => setIsOpen((o) => !o)}
				className='flex items-center gap-2 pr-1.5 outline-none text-18 sm:text-22 uppercase cursor-pointer'
			>
				{selectedItem?.value && (
					<Image
						src={getFlagSrc(selectedItem?.value)}
						alt={`${selectedItem?.value} flag`}
						width={20}
						height={14}
						className='rounded-[2px]'
						priority
					/>
				)}
				<span>{selectedItem?.label}</span>
				<Image
					src='/icons/chevron-down-white.svg'
					alt='toggle locales'
					width={14}
					height={14}
					className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
				/>
			</button>

			{isOpen && items.length > 0 && (
				<ul
					role='listbox'
					aria-label={label || 'Select locale'}
					className='right-0 z-40 absolute bg-white/10 shadow-lg backdrop-blur-md mt-2 border border-white/10 rounded-xl min-w-[7rem] overflow-hidden'
				>
					{items.map((item) => {
						const active = item.value === selectedValue
						return (
							<li
								key={item.value}
								role='option'
								aria-selected={active}
							>
								<button
									type='button'
									onClick={() => selectLocale(item.value)}
									className={`w-full text-left px-3 py-2 text-16 sm:text-18 uppercase hover:bg-white/20 ${
										active ? 'bg-white/15' : ''
									} flex items-center gap-2`}
								>
									{item.value && (
										<Image
											src={getFlagSrc(item.value)}
											alt={`${item.value} flag`}
											width={18}
											height={12}
											className='rounded-[2px]'
										/>
									)}
									<span>{item.label}</span>
								</button>
							</li>
						)
					})}
				</ul>
			)}
		</div>
	)
}
