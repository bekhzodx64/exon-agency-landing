'use client'

import { useEffect, useState } from 'react'

export default function ScrollModal() {
	const [showModal, setShowModal] = useState(false)
	const [hasShown, setHasShown] = useState(false)

	useEffect(() => {
		// Проверяем, показывалось ли модальное окно в последние 24 часа
		const lastShown = localStorage.getItem('scrollModalLastShown')
		const now = Date.now()
		const ONE_DAY = 24 * 60 * 60 * 1000 // 24 часа в миллисекундах

		if (lastShown && now - parseInt(lastShown) < ONE_DAY) {
			setHasShown(true)
			return
		}

		// Минимальное время на странице перед показом модального окна (в миллисекундах)
		const MIN_TIME_ON_PAGE = 3000 // 3 секунды
		let timeOnPage = 0
		let startTime = Date.now()

		const handleScroll = () => {
			// Проверяем, доскроллил ли пользователь до конца страницы
			const scrollTop = window.pageYOffset || document.documentElement.scrollTop
			const windowHeight = window.innerHeight
			const documentHeight = document.documentElement.scrollHeight

			// Обновляем время на странице
			timeOnPage = Date.now() - startTime

			// Если пользователь доскроллил до конца (с небольшим запасом) и модальное окно еще не показывалось
			// и прошло достаточно времени на странице
			if (
				scrollTop + windowHeight >= documentHeight - 150 &&
				!hasShown &&
				timeOnPage >= MIN_TIME_ON_PAGE
			) {
				// Небольшая задержка для лучшего UX
				setTimeout(() => {
					setShowModal(true)
					setHasShown(true)
					// Сохраняем время показа в localStorage
					localStorage.setItem('scrollModalLastShown', now.toString())
				}, 500)
			}
		}

		// Добавляем обработчик скролла с throttling для производительности
		let ticking = false
		const throttledHandleScroll = () => {
			if (!ticking) {
				requestAnimationFrame(() => {
					handleScroll()
					ticking = false
				})
				ticking = true
			}
		}

		window.addEventListener('scroll', throttledHandleScroll)

		// Проверяем сразу при загрузке страницы
		handleScroll()

		return () => {
			window.removeEventListener('scroll', throttledHandleScroll)
		}
	}, [hasShown])

	// Обработчик нажатия клавиши Escape
	useEffect(() => {
		const handleEscape = (e) => {
			if (e.key === 'Escape' && showModal) {
				closeModal()
			}
		}

		if (showModal) {
			document.addEventListener('keydown', handleEscape)
			// Блокируем скролл на body при открытом модальном окне
			document.body.style.overflow = 'hidden'
		}

		return () => {
			document.removeEventListener('keydown', handleEscape)
			document.body.style.overflow = 'unset'
		}
	}, [showModal])

	const closeModal = () => {
		setShowModal(false)
	}

	const handleCallRequest = () => {
		// Прокручиваем к форме контактов
		const contactsSection = document.getElementById('contacts')
		if (contactsSection) {
			contactsSection.scrollIntoView({
				behavior: 'smooth',
				block: 'start',
			})
		}
		closeModal()
	}

	const handleClose = () => {
		closeModal()
	}

	const handleBackdropClick = (e) => {
		// Закрываем модальное окно только при клике на backdrop
		if (e.target === e.currentTarget) {
			closeModal()
		}
	}

	if (!showModal) return null

	return (
		<div
			className='z-50 fixed inset-0 flex justify-center items-center bg-black/50 p-4 animate-fadeIn'
			onClick={handleBackdropClick}
		>
			<div className='bg-[#373737] p-8 border border-white/40 rounded-xl w-full max-w-md text-center animate-slideUp'>
				<div className='mb-6'>
					<div className='flex justify-center items-center bg-blue-500 mx-auto mb-4 rounded-full w-16 h-16'>
						<svg
							className='w-8 h-8 text-white'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
							/>
						</svg>
					</div>
					<h3 className='mb-3 font-bold text-white text-2xl'>
						Не смогли решить что нужно?
					</h3>
					<p className='mb-6 text-white/80'>
						Оставьте заявку и мы свяжемся с вами для консультации по работе с
						маркетплейсами
					</p>
				</div>

				<div className='flex sm:flex-row flex-col gap-3'>
					<button
						onClick={handleCallRequest}
						className='flex-1 bg-white hover:bg-gray-200 px-6 py-3 rounded-xl font-bold text-black transition-colors'
					>
						Заказать звонок
					</button>
					<button
						onClick={handleClose}
						className='flex-1 bg-transparent hover:bg-white/10 px-6 py-3 border border-white/40 rounded-xl font-bold text-white transition-colors'
					>
						Закрыть
					</button>
				</div>
			</div>
		</div>
	)
}
