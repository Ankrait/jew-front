import { useState } from 'react';
import ChatBot from './ChatBot';
import { MessageSquare, X } from 'lucide-react';

export default function ClientView() {
	const [chatOpen, setChatOpen] = useState(false);

	return (
		<div className="relative">
			<section className="py-20 px-4">
				<div className="max-w-6xl mx-auto">
					<div className="text-center mb-16">
						<h2 className="text-5xl font-bold text-slate-800 mb-4">
							Ювелирные изделия премиум класса
						</h2>
						<p className="text-xl text-slate-600 max-w-2xl mx-auto">
							Эксклюзивные украшения, созданные с мастерством и любовью к деталям
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
						<div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
							<div className="w-full h-64 bg-gradient-to-br from-amber-100 to-amber-200 rounded-xl mb-6 flex items-center justify-center">
								<span className="text-6xl">💍</span>
							</div>
							<h3 className="text-2xl font-semibold text-slate-800 mb-2">Кольца</h3>
							<p className="text-slate-600">
								Обручальные и помолвочные кольца из золота и платины
							</p>
						</div>

						<div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
							<div className="w-full h-64 bg-gradient-to-br from-rose-100 to-rose-200 rounded-xl mb-6 flex items-center justify-center">
								<span className="text-6xl">📿</span>
							</div>
							<h3 className="text-2xl font-semibold text-slate-800 mb-2">Ожерелья</h3>
							<p className="text-slate-600">Изысканные колье с драгоценными камнями</p>
						</div>

						<div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
							<div className="w-full h-64 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl mb-6 flex items-center justify-center">
								<span className="text-6xl">💎</span>
							</div>
							<h3 className="text-2xl font-semibold text-slate-800 mb-2">Серьги</h3>
							<p className="text-slate-600">
								Элегантные серьги с бриллиантами и сапфирами
							</p>
						</div>
					</div>

					<div className="bg-white rounded-2xl p-12 shadow-lg text-center">
						<h3 className="text-3xl font-bold text-slate-800 mb-4">
							Нужна консультация?
						</h3>
						<p className="text-lg text-slate-600 mb-6">
							Наш AI-ассистент поможет подобрать идеальное украшение
						</p>
						<button
							onClick={() => setChatOpen(true)}
							className="bg-amber-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-amber-700 transition-colors shadow-md hover:shadow-lg">
							Начать общение с консультантом
						</button>
					</div>
				</div>
			</section>

			{!chatOpen && (
				<button
					onClick={() => setChatOpen(true)}
					className="fixed bottom-6 right-6 bg-amber-600 text-white p-5 rounded-full shadow-2xl hover:bg-amber-700 transition-all hover:scale-110 z-40"
					aria-label="Открыть чат">
					<MessageSquare className="w-7 h-7" />
				</button>
			)}

			{chatOpen && (
				<div className="fixed bottom-6 right-6 w-[400px] h-[600px] bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden">
					<div className="bg-gradient-to-r from-amber-600 to-amber-700 p-4 flex justify-between items-center">
						<div className="flex items-center gap-3">
							<div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
								<span className="text-2xl">💎</span>
							</div>
							<div>
								<h3 className="text-white font-semibold">JewelBot</h3>
								<p className="text-amber-100 text-sm">Онлайн</p>
							</div>
						</div>
						<button
							onClick={() => setChatOpen(false)}
							className="text-white hover:bg-amber-800 p-2 rounded-lg transition-colors">
							<X className="w-5 h-5" />
						</button>
					</div>
					<ChatBot />
				</div>
			)}
		</div>
	);
}
