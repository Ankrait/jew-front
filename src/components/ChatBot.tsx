import { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';

interface Message {
	id: string;
	text: string;
	sender: 'user' | 'bot';
	timestamp: Date;
}

export default function ChatBot() {
	const [messages, setMessages] = useState<Message[]>([
		{
			id: '1',
			text: 'Здравствуйте! Я ваш персональный консультант по ювелирным изделиям. Чем могу помочь?',
			sender: 'bot',
			timestamp: new Date(),
		},
	]);
	const [input, setInput] = useState('');
	const messagesEndRef = useRef<HTMLDivElement>(null);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	};

	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	const handleSend = () => {
		if (!input.trim()) return;

		const userMessage: Message = {
			id: Date.now().toString(),
			text: input,
			sender: 'user',
			timestamp: new Date(),
		};

		setMessages((prev) => [...prev, userMessage]);
		setInput('');

		setTimeout(() => {
			const botResponse: Message = {
				id: (Date.now() + 1).toString(),
				text: getBotResponse(input),
				sender: 'bot',
				timestamp: new Date(),
			};
			setMessages((prev) => [...prev, botResponse]);
		}, 1000);
	};

	const getBotResponse = (userInput: string): string => {
		const lowerInput = userInput.toLowerCase();

		if (lowerInput.includes('кольц') || lowerInput.includes('помолв')) {
			return 'У нас есть прекрасная коллекция помолвочных и обручальных колец. Какой бюджет вы рассматриваете? Предпочитаете белое или желтое золото?';
		} else if (lowerInput.includes('цена') || lowerInput.includes('стоимость')) {
			return 'Наши цены варьируются в зависимости от материала и сложности работы. Изделия из золота 585 пробы начинаются от 30 000 руб. Могу предложить несколько вариантов в вашем бюджете!';
		} else if (lowerInput.includes('размер')) {
			return 'Мы предлагаем бесплатную услугу определения размера в нашем салоне. Также можете воспользоваться нашей таблицей размеров на сайте. Хотите записаться на примерку?';
		} else if (lowerInput.includes('доставка')) {
			return 'Мы осуществляем доставку по всей России. По Москве - бесплатно при заказе от 50 000 руб. Доставка курьером занимает 1-2 дня.';
		} else {
			return 'Спасибо за ваш вопрос! Наш специалист свяжется с вами для более детальной консультации. Можете оставить ваш номер телефона или email?';
		}
	};

	return (
		<>
			<div className="flex-1 overflow-y-auto p-4 space-y-4">
				{messages.map((message) => (
					<div
						key={message.id}
						className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'
							}`}>
						<div
							className={`max-w-[75%] rounded-2xl px-4 py-3 ${message.sender === 'user'
								? 'bg-purple-600 text-white'
								: 'bg-slate-100 text-slate-800'
								}`}>
							<p className="text-sm leading-relaxed">{message.text}</p>
							<span
								className={`text-xs mt-1 block ${message.sender === 'user' ? 'text-purple-100' : 'text-slate-500'
									}`}>
								{message.timestamp.toLocaleTimeString('ru-RU', {
									hour: '2-digit',
									minute: '2-digit',
								})}
							</span>
						</div>
					</div>
				))}
				<div ref={messagesEndRef} />
			</div>

			<div className="border-t border-slate-200 p-4">
				<div className="flex gap-2">
					<input
						type="text"
						value={input}
						onChange={(e) => setInput(e.target.value)}
						onKeyPress={(e) => e.key === 'Enter' && handleSend()}
						placeholder="Введите сообщение..."
						className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
					/>
					<button
						onClick={handleSend}
						className="bg-purple-600 text-white p-3 rounded-xl hover:bg-purple-700 transition-colors">
						<Send className="w-5 h-5" />
					</button>
				</div>
			</div>
		</>
	);
}
