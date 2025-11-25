'use client'

import { useTranslations } from 'next-intl'
import { useRef, useState } from 'react'
import Confetti from '../shared/confetti'
import Link from 'next/link'
import Image from 'next/image'

export default function Contacts() {
	const t = useTranslations('Contacts')
	const f = useTranslations('SuccessForm')

	const [formData, setFormData] = useState({
		username: '',
		phone: '',
		product: '',
		price: '',
		goals: [],
	})
	const [errors, setErrors] = useState({
		username: false,
		phone: false,
		product: false,
		price: false,
		goals: false,
	})
	const [showConfetti, setShowConfetti] = useState(false)
	const [showSuccessModal, setShowSuccessModal] = useState(false)
	const [isSubmitting, setIsSubmitting] = useState(false)
	const phoneInputRef = useRef(null)

	function handleNameChange(e) {
		const value = e.target.value
		const filtered = value.replace(/[^a-zA-Zа-яА-ЯёЁ\s]/g, '')
		setFormData((prev) => ({ ...prev, username: filtered }))
	}

	function formatPhone(raw) {
		let digits = raw.replace(/\D/g, '')
		if (digits.startsWith('998')) digits = digits.slice(3)
		digits = digits.slice(0, 9)
		if (digits.length === 0) return ''
		let masked = ''
		if (digits.length > 0) masked += digits.slice(0, 2)
		if (digits.length > 2) masked += ' ' + digits.slice(2, 5)
		if (digits.length > 5) masked += '-' + digits.slice(5, 7)
		if (digits.length > 7) masked += '-' + digits.slice(7, 9)
		return masked
	}

	function handlePhoneChange(e) {
		let raw = e.target.value
		if (raw && !/^\d[\d\s\-]*$/.test(raw)) {
			return
		}
		const masked = formatPhone(raw)
		setFormData((prev) => ({ ...prev, phone: masked }))
	}

	function handleProductChange(e) {
		setFormData((prev) => ({ ...prev, product: e.target.value }))
	}

	function handlePriceChange(e) {
		setFormData((prev) => ({ ...prev, price: e.target.value }))
	}

	function handleGoalsChange(e) {
		const value = e.target.value
		setFormData((prev) => ({
			...prev,
			goals: e.target.checked
				? [...prev.goals, value]
				: prev.goals.filter((goal) => goal !== value),
		}))
	}

	function handlePhoneKeyDown(e) {
		if (e.key === 'Backspace' && formData.phone === '') {
			e.preventDefault()
		}
	}

	async function sendToTelegram(data) {
		try {
			const response = await fetch('/api/telegram', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			})

			if (!response.ok) {
				const errorData = await response.json()
				console.error('Server error:', errorData)
				throw new Error(errorData.error || 'Failed to send message')
			}

			const result = await response.json()
			return result.success
		} catch (error) {
			console.error('Error sending to Telegram:', error)
			return false
		}
	}

	async function handleSubmit(e) {
		e.preventDefault()

		setErrors({
			username: false,
			phone: false,
			product: false,
			price: false,
			goals: false,
		})

		const newErrors = {
			username: !formData.username.trim(),
			phone: !formData.phone.trim(),
			product: !formData.product.trim(),
			price: !formData.price,
			goals: formData.goals.length === 0,
		}

		if (Object.values(newErrors).some((error) => error)) {
			setErrors(newErrors)
			return
		}

		setIsSubmitting(true)

		try {
			const cleanPhone = formData.phone.replace(/[\s-]/g, '')
			const fullPhone = '+998' + cleanPhone
			const submitData = {
				username: formData.username,
				phone: fullPhone,
				product: formData.product,
				price: formData.price,
				goals: formData.goals,
			}

			const sent = await sendToTelegram(submitData)

			if (sent) {
				setShowConfetti(true)
				setShowSuccessModal(true)
				setFormData({
					username: '',
					phone: '',
					product: '',
					price: '',
					goals: [],
				})
			} else {
				alert(
					'Произошла ошибка при отправке формы. Пожалуйста, попробуйте еще раз.'
				)
			}
		} catch (error) {
			console.error('Error submitting form:', error)
			alert(
				'Произошла ошибка при отправке формы. Пожалуйста, попробуйте еще раз.'
			)
		} finally {
			setIsSubmitting(false)
		}
	}

	function handleConfettiComplete() {
		setShowConfetti(false)
	}

	function closeModal() {
		setShowSuccessModal(false)
	}

	return (
		<>
			<Confetti
				isActive={showConfetti}
				onComplete={handleConfettiComplete}
			/>

			{showSuccessModal && (
				<div className='z-50 fixed inset-0 flex justify-center items-center bg-black/50 p-4'>
					<div className='bg-[#373737] p-8 border border-white/40 rounded-xl w-full max-w-md text-center'>
						<div className='mb-4'>
							<div className='flex justify-center items-center bg-green-500 mx-auto mb-4 rounded-full w-16 h-16'>
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
										d='M5 13l4 4L19 7'
									/>
								</svg>
							</div>
							<h3 className='mb-2 font-bold text-white text-2xl'>
								{f('title')}
							</h3>
							<p className='text-white/80'>{f('description')}</p>
						</div>
						<button
							onClick={closeModal}
							className='bg-white hover:bg-gray-200 px-6 py-3 rounded-xl font-bold text-black transition-colors cursor-pointer'
						>
							{f('button')}
						</button>
					</div>
				</div>
			)}

			<section
				className='mx-auto px-5 py-8 md:py-20 scroll-mt-[120px] container'
				id='contacts'
			>
				<div>
					<h2 className='bg-clip-text bg-gradient-to-b from-[#50aa55] to-[#98f5aa] mb-14 font-bold text-[50px] text-transparent text-center'>
						{t('title')}
					</h2>

					<div className='flex sm:flex-row flex-col justify-between gap-4 mx-auto mb-10 max-w-4xl'>
						<Link
							href='tel:+998940120010'
							className='flex items-center gap-2'
						>
							<div className='relative rounded-full size-6 overflow-hidden'>
								<Image
									src='/icons/call.svg'
									alt='phone'
									className='object-cover'
									fill
								/>
							</div>
							<p>+998 (94) 012-00-10</p>
						</Link>

						<Link
							href='https://t.me/exon_marketing_support'
							target='_blank'
							className='flex items-center gap-2'
						>
							<div className='relative rounded-full size-6 overflow-hidden'>
								<Image
									src='/icons/telegram-icon.svg'
									alt='telegram'
									className='object-cover'
									fill
								/>
							</div>
							<p>@exon_marketing_support</p>
						</Link>

						<Link
							href='https://www.instagram.com/exon.uz/'
							className='flex items-center gap-2'
							target='_blank'
						>
							<div className='relative rounded-full size-6 overflow-hidden'>
								<Image
									src='/icons/instagram.svg'
									alt='instagram'
									className='object-cover'
									fill
								/>
							</div>
							<p>exon.uz</p>
						</Link>
					</div>

					<form
						onSubmit={handleSubmit}
						className='flex flex-col gap-4 md:gap-5 mx-auto max-w-4xl'
					>
						<div className='flex md:flex-row flex-col gap-4 md:gap-5'>
							<label className='space-y-1 w-full'>
								<p className='text-14'>{t('nameLabel')}</p>
								<div className='space-y-1'>
									<input
										name='username'
										type='text'
										value={formData.username}
										className={`bg-[#373737] px-3 py-2 border focus:border-[#76F8A2] rounded-lg focus:outline-none w-full text-white text-sm transition-colors placeholder-white/40 ${
											errors.username ? 'border-red-500' : 'border-white/20'
										}`}
										placeholder={t('namePlaceholder')}
										onChange={handleNameChange}
										disabled={isSubmitting}
									/>
									{errors.username && (
										<p className='text-red-500 text-sm'>
											Пожалуйста, введите ваше имя
										</p>
									)}
								</div>
							</label>

							<label className='space-y-1 w-full'>
								<p className='text-14'>{t('telLabel')}</p>
								<div className='space-y-1'>
									<div
										className={`relative flex items-center bg-[#373737] px-3 py-2 transition-colors border focus-within:border-[#76F8A2] rounded-lg ${
											errors.phone ? 'border-red-500' : 'border-white/20'
										}`}
									>
										<span className='mr-1 text-white text-sm'>+998</span>
										<input
											type='tel'
											inputMode='numeric'
											placeholder='00 123-45-67'
											className='bg-transparent outline-none w-full text-white text-sm placeholder-white/40'
											value={formData.phone}
											onChange={handlePhoneChange}
											onKeyDown={handlePhoneKeyDown}
											maxLength={13}
											ref={phoneInputRef}
											disabled={isSubmitting}
										/>
									</div>
									{errors.phone && (
										<p className='text-red-500 text-sm'>
											Пожалуйста, введите номер телефона
										</p>
									)}
								</div>
							</label>
						</div>

						<div className='space-y-4 bg-[#2C2C2C] p-4 border border-white/10 rounded-xl'>
							<div className='space-y-1'>
								<label className='block'>
									<p className='mb-2 font-medium text-white/80 text-sm'>
										1. {t('questionTitle1')}
									</p>
									<input
										type='text'
										name='product'
										value={formData.product}
										onChange={handleProductChange}
										className={`bg-[#373737] px-3 py-2 border focus:border-[#76F8A2] rounded-lg focus:outline-none w-full text-white text-sm transition-colors placeholder-white/40 ${
											errors.product ? 'border-red-500' : 'border-white/20'
										}`}
										placeholder={t('questionTitle1Placeholder')}
										disabled={isSubmitting}
									/>
								</label>
								{errors.product && (
									<p className='text-red-500 text-sm'>
										Пожалуйста, укажите тип товара
									</p>
								)}
							</div>

							<div className='space-y-1'>
								<p className='mb-2 font-medium text-white/80 text-sm'>
									2. {t('questionTitle2')}
								</p>

								<div
									className={`gap-2 grid grid-cols-1 sm:grid-cols-3 ${
										errors.price ? 'border border-red-500 rounded-lg p-2' : ''
									}`}
								>
									<label className='flex items-center gap-2 hover:bg-white/5 p-2 border border-white/20 rounded-lg transition-colors cursor-pointer'>
										<input
											type='radio'
											name='price'
											value='less_100k'
											checked={formData.price === 'less_100k'}
											onChange={handlePriceChange}
											className='w-3.5 h-3.5 accent-[#76F8A2]'
											disabled={isSubmitting}
										/>
										<span className='text-white/80 text-sm'>
											{t('questionTitle2Option1')}
										</span>
									</label>
									<label className='flex items-center gap-2 hover:bg-white/5 p-2 border border-white/20 rounded-lg transition-colors cursor-pointer'>
										<input
											type='radio'
											name='price'
											value='100k_500k'
											checked={formData.price === '100k_500k'}
											onChange={handlePriceChange}
											className='w-3.5 h-3.5 accent-[#76F8A2]'
											disabled={isSubmitting}
										/>
										<span className='text-white/80 text-sm'>
											{t('questionTitle2Option2')}
										</span>
									</label>
									<label className='flex items-center gap-2 hover:bg-white/5 p-2 border border-white/20 rounded-lg transition-colors cursor-pointer'>
										<input
											type='radio'
											name='price'
											value='more_500k'
											checked={formData.price === 'more_500k'}
											onChange={handlePriceChange}
											className='w-3.5 h-3.5 accent-[#76F8A2]'
											disabled={isSubmitting}
										/>
										<span className='text-white/80 text-sm'>
											{t('questionTitle2Option3')}
										</span>
									</label>
								</div>
								{errors.price && (
									<p className='text-red-500 text-sm'>
										Пожалуйста, выберите ценовой диапазон
									</p>
								)}
							</div>

							<div className='space-y-1'>
								<p className='mb-2 font-medium text-white/80 text-sm'>
									3. {t('questionTitle3')}
								</p>

								<div
									className={`gap-2 grid grid-cols-1 sm:grid-cols-2 ${
										errors.goals ? 'border border-red-500 rounded-lg p-2' : ''
									}`}
								>
									<label className='flex items-center gap-2 hover:bg-white/5 p-2 border border-white/20 rounded-lg transition-colors cursor-pointer'>
										<input
											type='checkbox'
											name='goals[]'
											value='presence'
											checked={formData.goals.includes('presence')}
											onChange={handleGoalsChange}
											className='rounded w-3.5 h-3.5 accent-[#76F8A2]'
											disabled={isSubmitting}
										/>
										<span className='text-white/80 text-sm'>
											{t('questionTitle3Option1')}
										</span>
									</label>
									<label className='flex items-center gap-2 hover:bg-white/5 p-2 border border-white/20 rounded-lg transition-colors cursor-pointer'>
										<input
											type='checkbox'
											name='goals[]'
											value='sales'
											checked={formData.goals.includes('sales')}
											onChange={handleGoalsChange}
											className='rounded w-3.5 h-3.5 accent-[#76F8A2]'
											disabled={isSubmitting}
										/>
										<span className='text-white/80 text-sm'>
											{t('questionTitle3Option2')}
										</span>
									</label>
									<label className='flex items-center gap-2 hover:bg-white/5 p-2 border border-white/20 rounded-lg transition-colors cursor-pointer'>
										<input
											type='checkbox'
											name='goals[]'
											value='branding'
											checked={formData.goals.includes('branding')}
											onChange={handleGoalsChange}
											className='rounded w-3.5 h-3.5 accent-[#76F8A2]'
											disabled={isSubmitting}
										/>
										<span className='text-white/80 text-sm'>
											{t('questionTitle3Option3')}
										</span>
									</label>
									<label className='flex items-center gap-2 hover:bg-white/5 p-2 border border-white/20 rounded-lg transition-colors cursor-pointer'>
										<input
											type='checkbox'
											name='goals[]'
											value='consultation'
											checked={formData.goals.includes('consultation')}
											onChange={handleGoalsChange}
											className='rounded w-3.5 h-3.5 accent-[#76F8A2]'
											disabled={isSubmitting}
										/>
										<span className='text-white/80 text-sm'>
											{t('questionTitle3Option4')}
										</span>
									</label>
								</div>
								{errors.goals && (
									<p className='text-red-500 text-sm'>
										Пожалуйста, выберите хотя бы одну цель
									</p>
								)}
							</div>
						</div>

						<div className='flex justify-center items-center'>
							<button
								type='submit'
								disabled={isSubmitting}
								className='disabled:opacity-50 px-8 py-3 rounded-xl text-14 md:text-base lg:text-lg cursor-pointer disabled:cursor-not-allowed btn-gradient'
							>
								{isSubmitting ? t('submitPending') : t('submit')}
							</button>
						</div>
					</form>
				</div>
			</section>
		</>
	)
}
