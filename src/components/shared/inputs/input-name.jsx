'use client'

export default function InputName() {
	function handleChange(e) {
		const value = e.target.value
		const filtered = value.replace(/[^a-zA-Zа-яА-ЯёЁ\s]/g, '')
		e.target.value = filtered
	}
	return (
		<input
			name='username'
			type='text'
			className='bg-[#373737] px-5 py-3 border border-white/40 rounded-xl outline-none w-full placeholder:font-normal font-bold text-20 placeholder:text-black80'
			placeholder='Ismingizni kiriting...'
			onInput={handleChange}
		/>
	)
}
