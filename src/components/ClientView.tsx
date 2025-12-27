import { Link } from 'react-router-dom';
import { MessageSquare, ArrowRight } from 'lucide-react';

export default function ClientView() {
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
						<Link
							to="/products?category=rings"
							className="bg-purple-100 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow cursor-pointer group">
							<div className="w-full h-64 bg-gradient-to-br from-fuchsia-100 to-fuchsia-200 rounded-xl mb-6 flex items-center justify-center group-hover:scale-105 transition-transform">
								<span className="text-6xl">💍</span>
							</div>
							<h3 className="text-2xl font-semibold text-slate-800 mb-2">Кольца</h3>
							<p className="text-slate-600 mb-4">
								Обручальные и помолвочные кольца из золота и платины
							</p>
							<div className="flex items-center text-purple-600 font-medium group-hover:text-purple-700">
								Смотреть коллекцию
								<ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
							</div>
						</Link>

						<Link
							to="/products?category=necklaces"
							className="bg-purple-100 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow cursor-pointer group">
							<div className="w-full h-64 bg-gradient-to-br from-pink-100 to-pink-200 rounded-xl mb-6 flex items-center justify-center group-hover:scale-105 transition-transform">
								<span className="text-6xl">📿</span>
							</div>
							<h3 className="text-2xl font-semibold text-slate-800 mb-2">Ожерелья</h3>
							<p className="text-slate-600 mb-4">Изысканные колье с драгоценными камнями</p>
							<div className="flex items-center text-purple-600 font-medium group-hover:text-purple-700">
								Смотреть коллекцию
								<ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
							</div>
						</Link>

						<Link
							to="/products?category=earrings"
							className="bg-purple-100 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow cursor-pointer group">
							<div className="w-full h-64 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl mb-6 flex items-center justify-center group-hover:scale-105 transition-transform">
								<span className="text-6xl">💎</span>
							</div>
							<h3 className="text-2xl font-semibold text-slate-800 mb-2">Серьги</h3>
							<p className="text-slate-600 mb-4">
								Элегантные серьги с бриллиантами и сапфирами
							</p>
							<div className="flex items-center text-purple-600 font-medium group-hover:text-purple-700">
								Смотреть коллекцию
								<ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
							</div>
						</Link>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						<div className="bg-purple-100 rounded-2xl p-12 shadow-lg text-center">
							<h3 className="text-3xl font-bold text-slate-800 mb-4">
								Нужна консультация?
							</h3>
							<p className="text-lg text-slate-600 mb-6">
								Наш AI-ассистент поможет подобрать идеальное украшение
							</p>
							<Link
								to="/chat"
								className="inline-flex items-center bg-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-purple-700 transition-colors shadow-md hover:shadow-lg">
								Начать общение с консультантом
								<ArrowRight className="w-5 h-5 ml-2" />
							</Link>
						</div>

						<div className="bg-purple-100 rounded-2xl p-12 shadow-lg text-center">
							<h3 className="text-3xl font-bold text-slate-800 mb-4">
								Весь каталог
							</h3>
							<p className="text-lg text-slate-600 mb-6">
								Ознакомьтесь с полным ассортиментом наших изделий
							</p>
							<Link
								to="/products"
								className="inline-flex items-center bg-gradient-to-r from-purple-600 to-purple-700 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-purple-800 transition-colors shadow-md hover:shadow-lg">
								Перейти в каталог
								<ArrowRight className="w-5 h-5 ml-2" />
							</Link>
						</div>
					</div>
				</div>
			</section>

			{/* Floating chat button */}
			<Link
				to="/chat"
				className="fixed bottom-6 right-6 bg-purple-600 text-white p-5 rounded-full shadow-2xl hover:bg-purple-700 transition-all hover:scale-110 z-40"
				aria-label="Открыть чат">
				<MessageSquare className="w-7 h-7" />
			</Link>
		</div>
	);
}
