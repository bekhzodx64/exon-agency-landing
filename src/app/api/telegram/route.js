import { NextResponse } from 'next/server'

const BOT_TOKEN = '8341104543:AAEOP8yhbqhmNiJQLw33NZVtxTwBOy5Qewk'
const CHAT_ID = '-5094316123'

const priceRanges = {
	less_100k: 'Меньше 100 000 сум',
	'100k_500k': '100 000 – 500 000 сум',
	more_500k: 'Больше 500 000 сум',
}

const goalLabels = {
	presence: 'Просто быть там «для галочки»',
	sales: 'Получать продажи',
	branding: 'Красиво представить бренд',
	consultation: 'Пока не знаю — хочу консультацию',
}

export async function POST(request) {
	try {
		const data = await request.json()

		if (
			!data.username ||
			!data.phone ||
			!data.product ||
			!data.price ||
			!data.goals
		) {
			return NextResponse.json(
				{ success: false, error: 'Missing required fields' },
				{ status: 400 }
			)
		}

		const message =
			`🆕 Новая заявка с сайта!\n\n` +
			`👤 Имя: ${data.username}\n` +
			`📞 Телефон: ${data.phone}\n` +
			`🏷 Продукт: ${data.product}\n` +
			`💰 Ценовой диапазон: ${priceRanges[data.price]}\n` +
			`🎯 Цели:\n${data.goals
				.map((goal) => `- ${goalLabels[goal]}`)
				.join('\n')}`

		const telegramResponse = await fetch(
			`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					chat_id: CHAT_ID,
					text: message,
					parse_mode: 'HTML',
				}),
			}
		)

		const telegramData = await telegramResponse.json()

		if (!telegramResponse.ok) {
			console.error('Telegram API error:', telegramData)
			throw new Error(
				telegramData.description || 'Failed to send message to Telegram'
			)
		}

		return NextResponse.json({ success: true })
	} catch (error) {
		console.error('Server error:', error)
		return NextResponse.json(
			{ success: false, error: error.message },
			{ status: 500 }
		)
	}
}
