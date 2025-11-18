'use client'
import { useRef, useState } from 'react'

export default function InputPhone() {
	const [value, setValue] = useState('')
	const inputRef = useRef(null)

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

	function handleChange(e) {
		let raw = e.target.value
		if (raw && !/^\d[\d\s\-]*$/.test(raw)) {
			return
		}
		const masked = formatPhone(raw)
		setValue(masked)
	}

	function handleKeyDown(e) {
		if (e.key === 'Backspace' && value === '') {
			e.preventDefault()
		}
	}

	return (
		<div className='relative flex items-center bg-[#373737] px-5 py-3 border border-white/40 rounded-xl'>
			<span className='mr-1 font-bold text-20 text-white'>+998</span>
			<input
				type='tel'
				inputMode='numeric'
				placeholder='00 123-45-67'
				className='bg-transparent outline-none w-full placeholder:font-normal font-bold text-20 text-white placeholder:text-black80'
				value={value}
				onChange={handleChange}
				onKeyDown={handleKeyDown}
				maxLength={13}
				ref={inputRef}
			/>
		</div>
	)
}
