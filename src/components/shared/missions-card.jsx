export default function MissionsCard({ title, description }) {
	return (
		<div className='relative flex flex-col justify-center items-center gap-3 bg-[#373737] px-9 xl:px-12 py-14 xl:py-20 border border-white/20 rounded-4xl overflow-hidden text-center'>
			<div className='top-1 right-1 absolute border-t-[75px] border-t-green-400 border-l-[75px] border-l-transparent rounded-tr-4xl w-0 h-0'></div>

			<h3 className='bg-clip-text bg-gradient-to-b from-[#50aa55] to-[#98f5aa] font-bold text-transparent df:text-34 lg:text-34 text-3xl'>
				{title}
			</h3>
			<p className='text-white/50 df:text-18 lg:text-18 text-sm text-balance'>
				{description}
			</p>
		</div>
	)
}
