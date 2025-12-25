import { useEffect, useState } from 'react';
import {
	MessageSquare,
	TrendingUp,
	Users,
	Settings,
	Send,
	Globe,
	Bot,
	TrendingDown,
	AlertCircle,
	Zap,
} from 'lucide-react';
import { AnalysisReportResponse, baseService } from '../services/base';

interface ChatSession {
	id: string;
	clientName: string;
	lastMessage: string;
	timestamp: string;
	status: 'active' | 'waiting' | 'closed';
}

export default function AdminView() {
	const [selectedChat, setSelectedChat] = useState<string | null>(null);
	const [activeTab, setActiveTab] = useState<'chats' | 'analytics' | 'settings'>('chats');

	const [analysis, setAnalysis] = useState<AnalysisReportResponse>();

	useEffect(() => {
		baseService
			.getAnalysisReport()
			.then(setAnalysis)
			.catch((error: unknown) => console.error('Ошибка при загрузке отчета:', error));
	}, []);

	const chatSessions: ChatSession[] = [
		{
			id: '1',
			clientName: 'Анна Петрова',
			lastMessage: 'Интересуют обручальные кольца',
			timestamp: '14:23',
			status: 'active',
		},
		{
			id: '2',
			clientName: 'Дмитрий Иванов',
			lastMessage: 'Какая стоимость доставки?',
			timestamp: '14:15',
			status: 'waiting',
		},
		{
			id: '3',
			clientName: 'Мария Смирнова',
			lastMessage: 'Спасибо за консультацию!',
			timestamp: '13:45',
			status: 'closed',
		},
	];

	return (
		<div className="max-w-7xl mx-auto px-4 py-8">
			<div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
				<div className="bg-white rounded-xl p-6 shadow-md border border-slate-200">
					<div className="flex items-center justify-between mb-2">
						<MessageSquare className="w-8 h-8 text-amber-600" />
						<span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
							+12%
						</span>
					</div>
					<p className="text-3xl font-bold text-slate-800 mb-1">247</p>
					<p className="text-sm text-slate-600">Активные диалоги</p>
				</div>

				<div className="bg-white rounded-xl p-6 shadow-md border border-slate-200">
					<div className="flex items-center justify-between mb-2">
						<Users className="w-8 h-8 text-blue-600" />
						<span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
							+8%
						</span>
					</div>
					<p className="text-3xl font-bold text-slate-800 mb-1">1,423</p>
					<p className="text-sm text-slate-600">Всего клиентов</p>
				</div>

				<div className="bg-white rounded-xl p-6 shadow-md border border-slate-200">
					<div className="flex items-center justify-between mb-2">
						<TrendingUp className="w-8 h-8 text-emerald-600" />
						<span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
							+23%
						</span>
					</div>
					<p className="text-3xl font-bold text-slate-800 mb-1">89%</p>
					<p className="text-sm text-slate-600">Конверсия в продажу</p>
				</div>

				<div className="bg-white rounded-xl p-6 shadow-md border border-slate-200">
					<div className="flex items-center justify-between mb-2">
						<Bot className="w-8 h-8 text-purple-600" />
						<span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
							AI
						</span>
					</div>
					<p className="text-3xl font-bold text-slate-800 mb-1">95%</p>
					<p className="text-sm text-slate-600">Точность бота</p>
				</div>
			</div>

			<div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
				<div className="border-b border-slate-200">
					<div className="flex">
						<button
							onClick={() => setActiveTab('chats')}
							className={`flex-1 px-6 py-4 font-medium transition-colors ${
								activeTab === 'chats'
									? 'text-amber-600 border-b-2 border-amber-600 bg-amber-50'
									: 'text-slate-600 hover:bg-slate-50'
							}`}>
							<MessageSquare className="w-5 h-5 inline mr-2" />
							Диалоги
						</button>
						<button
							onClick={() => setActiveTab('analytics')}
							className={`flex-1 px-6 py-4 font-medium transition-colors ${
								activeTab === 'analytics'
									? 'text-amber-600 border-b-2 border-amber-600 bg-amber-50'
									: 'text-slate-600 hover:bg-slate-50'
							}`}>
							<TrendingUp className="w-5 h-5 inline mr-2" />
							Аналитика
						</button>
						<button
							onClick={() => setActiveTab('settings')}
							className={`flex-1 px-6 py-4 font-medium transition-colors ${
								activeTab === 'settings'
									? 'text-amber-600 border-b-2 border-amber-600 bg-amber-50'
									: 'text-slate-600 hover:bg-slate-50'
							}`}>
							<Settings className="w-5 h-5 inline mr-2" />
							Настройки
						</button>
					</div>
				</div>

				<div className="p-6">
					{activeTab === 'chats' && (
						<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
							<div className="lg:col-span-1 space-y-2">
								<h3 className="font-semibold text-slate-800 mb-4 text-lg">
									Список диалогов
								</h3>
								{chatSessions.map((chat) => (
									<div
										key={chat.id}
										onClick={() => setSelectedChat(chat.id)}
										className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
											selectedChat === chat.id
												? 'border-amber-600 bg-amber-50'
												: 'border-slate-200 hover:border-slate-300 bg-white'
										}`}>
										<div className="flex justify-between items-start mb-2">
											<h4 className="font-semibold text-slate-800">{chat.clientName}</h4>
											<span
												className={`text-xs px-2 py-1 rounded-full ${
													chat.status === 'active'
														? 'bg-green-100 text-green-700'
														: chat.status === 'waiting'
														? 'bg-amber-100 text-amber-700'
														: 'bg-slate-100 text-slate-600'
												}`}>
												{chat.status === 'active'
													? 'Активен'
													: chat.status === 'waiting'
													? 'Ожидает'
													: 'Закрыт'}
											</span>
										</div>
										<p className="text-sm text-slate-600 mb-2">{chat.lastMessage}</p>
										<span className="text-xs text-slate-500">{chat.timestamp}</span>
									</div>
								))}
							</div>

							<div className="lg:col-span-2 bg-slate-50 rounded-lg p-6 border border-slate-200 flex flex-col h-[600px]">
								{selectedChat ? (
									<>
										<div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-300">
											<div>
												<h3 className="font-semibold text-slate-800 text-lg">
													{chatSessions.find((c) => c.id === selectedChat)?.clientName}
												</h3>
												<p className="text-sm text-slate-600">Онлайн</p>
											</div>
											<button className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors text-sm font-medium">
												Взять диалог
											</button>
										</div>

										<div className="flex-1 space-y-4 overflow-y-auto mb-4">
											<div className="flex justify-start">
												<div className="bg-white rounded-2xl px-4 py-3 max-w-[75%] shadow-sm">
													<p className="text-sm text-slate-800">
														Здравствуйте! Интересуют обручальные кольца из белого золота.
													</p>
													<span className="text-xs text-slate-500 mt-1 block">14:20</span>
												</div>
											</div>

											<div className="flex justify-end">
												<div className="bg-amber-600 text-white rounded-2xl px-4 py-3 max-w-[75%] shadow-sm">
													<p className="text-sm">
														Добрый день! У нас отличная коллекция. Какой бюджет вы
														рассматриваете?
													</p>
													<span className="text-xs text-amber-100 mt-1 block">14:21</span>
												</div>
											</div>

											<div className="flex justify-start">
												<div className="bg-white rounded-2xl px-4 py-3 max-w-[75%] shadow-sm">
													<p className="text-sm text-slate-800">
														До 80 000 рублей на пару
													</p>
													<span className="text-xs text-slate-500 mt-1 block">14:23</span>
												</div>
											</div>
										</div>

										<div className="flex gap-2 pt-4 border-t border-slate-300">
											<input
												type="text"
												placeholder="Введите сообщение..."
												className="flex-1 px-4 py-3 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
											/>
											<button className="bg-amber-600 text-white p-3 rounded-xl hover:bg-amber-700 transition-colors">
												<Send className="w-5 h-5" />
											</button>
										</div>
									</>
								) : (
									<div className="flex-1 flex items-center justify-center text-slate-500">
										Выберите диалог для просмотра
									</div>
								)}
							</div>
						</div>
					)}

					{activeTab === 'analytics' && (
						<div className="space-y-6">
							<h3 className="font-semibold text-slate-800 text-xl mb-6">
								Аналитика по каналам
							</h3>

							<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
								<div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
									<Globe className="w-10 h-10 text-blue-600 mb-4" />
									<h4 className="font-semibold text-slate-800 mb-2">Веб-сайт</h4>
									<p className="text-3xl font-bold text-blue-600 mb-1">824</p>
									<p className="text-sm text-slate-600">Активные сессии</p>
									<div className="mt-4 pt-4 border-t border-blue-200">
										<p className="text-sm text-slate-600">
											Конверсия: <span className="font-semibold">87%</span>
										</p>
									</div>
								</div>

								<div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-xl p-6 border border-cyan-200">
									<MessageSquare className="w-10 h-10 text-cyan-600 mb-4" />
									<h4 className="font-semibold text-slate-800 mb-2">Telegram</h4>
									<p className="text-3xl font-bold text-cyan-600 mb-1">412</p>
									<p className="text-sm text-slate-600">Активные сессии</p>
									<div className="mt-4 pt-4 border-t border-cyan-200">
										<p className="text-sm text-slate-600">
											Конверсия: <span className="font-semibold">92%</span>
										</p>
									</div>
								</div>

								<div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
									<Globe className="w-10 h-10 text-purple-600 mb-4" />
									<h4 className="font-semibold text-slate-800 mb-2">Партнерские сайты</h4>
									<p className="text-3xl font-bold text-purple-600 mb-1">187</p>
									<p className="text-sm text-slate-600">Активные сессии</p>
									<div className="mt-4 pt-4 border-t border-purple-200">
										<p className="text-sm text-slate-600">
											Конверсия: <span className="font-semibold">78%</span>
										</p>
									</div>
								</div>
							</div>

							<div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
								<h4 className="font-semibold text-slate-800 mb-4">Популярные запросы</h4>
								<div className="space-y-3">
									<div className="flex items-center justify-between">
										<span className="text-slate-700">Обручальные кольца</span>
										<div className="flex items-center gap-3">
											<div className="w-48 bg-slate-200 rounded-full h-2">
												<div
													className="bg-amber-600 h-2 rounded-full"
													style={{ width: '85%' }}></div>
											</div>
											<span className="text-sm font-medium text-slate-600 w-12">342</span>
										</div>
									</div>
									<div className="flex items-center justify-between">
										<span className="text-slate-700">Стоимость и цены</span>
										<div className="flex items-center gap-3">
											<div className="w-48 bg-slate-200 rounded-full h-2">
												<div
													className="bg-amber-600 h-2 rounded-full"
													style={{ width: '72%' }}></div>
											</div>
											<span className="text-sm font-medium text-slate-600 w-12">289</span>
										</div>
									</div>
									<div className="flex items-center justify-between">
										<span className="text-slate-700">Размеры украшений</span>
										<div className="flex items-center gap-3">
											<div className="w-48 bg-slate-200 rounded-full h-2">
												<div
													className="bg-amber-600 h-2 rounded-full"
													style={{ width: '58%' }}></div>
											</div>
											<span className="text-sm font-medium text-slate-600 w-12">234</span>
										</div>
									</div>
									<div className="flex items-center justify-between">
										<span className="text-slate-700">Доставка</span>
										<div className="flex items-center gap-3">
											<div className="w-48 bg-slate-200 rounded-full h-2">
												<div
													className="bg-amber-600 h-2 rounded-full"
													style={{ width: '45%' }}></div>
											</div>
											<span className="text-sm font-medium text-slate-600 w-12">181</span>
										</div>
									</div>
								</div>
							</div>

							<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
								<div className="bg-red-50 rounded-xl p-6 border border-red-200">
									<div className="flex items-center gap-2 mb-6">
										<TrendingDown className="w-6 h-6 text-red-600" />
										<h4 className="font-semibold text-slate-800 text-lg">
											Товары с низким спросом
										</h4>
									</div>
									<div className="space-y-3">
										<div className="bg-white rounded-lg p-4 border border-red-100 hover:border-red-300 transition-colors">
											<div className="flex items-start justify-between mb-2">
												<h5 className="font-medium text-slate-800">
													Браслеты из серебра
												</h5>
												<span className="text-xs font-bold bg-red-100 text-red-700 px-2 py-1 rounded-full">
													-34%
												</span>
											</div>
											<p className="text-sm text-slate-600 mb-2">45 запросов за месяц</p>
											<div className="w-full bg-slate-200 rounded-full h-1.5">
												<div
													className="bg-red-500 h-1.5 rounded-full"
													style={{ width: '15%' }}></div>
											</div>
										</div>

										<div className="bg-white rounded-lg p-4 border border-red-100 hover:border-red-300 transition-colors">
											<div className="flex items-start justify-between mb-2">
												<h5 className="font-medium text-slate-800">
													Украшения в стиле минимализм
												</h5>
												<span className="text-xs font-bold bg-red-100 text-red-700 px-2 py-1 rounded-full">
													-28%
												</span>
											</div>
											<p className="text-sm text-slate-600 mb-2">67 запросов за месяц</p>
											<div className="w-full bg-slate-200 rounded-full h-1.5">
												<div
													className="bg-red-500 h-1.5 rounded-full"
													style={{ width: '22%' }}></div>
											</div>
										</div>

										<div className="bg-white rounded-lg p-4 border border-red-100 hover:border-red-300 transition-colors">
											<div className="flex items-start justify-between mb-2">
												<h5 className="font-medium text-slate-800">
													Перстни с гравировкой
												</h5>
												<span className="text-xs font-bold bg-red-100 text-red-700 px-2 py-1 rounded-full">
													-41%
												</span>
											</div>
											<p className="text-sm text-slate-600 mb-2">32 запроса за месяц</p>
											<div className="w-full bg-slate-200 rounded-full h-1.5">
												<div
													className="bg-red-500 h-1.5 rounded-full"
													style={{ width: '11%' }}></div>
											</div>
										</div>

										<div className="bg-white rounded-lg p-4 border border-red-100 hover:border-red-300 transition-colors">
											<div className="flex items-start justify-between mb-2">
												<h5 className="font-medium text-slate-800">Броши винтажные</h5>
												<span className="text-xs font-bold bg-red-100 text-red-700 px-2 py-1 rounded-full">
													-52%
												</span>
											</div>
											<p className="text-sm text-slate-600 mb-2">18 запросов за месяц</p>
											<div className="w-full bg-slate-200 rounded-full h-1.5">
												<div
													className="bg-red-500 h-1.5 rounded-full"
													style={{ width: '8%' }}></div>
											</div>
										</div>
									</div>
								</div>

								<div className="bg-green-50 rounded-xl p-6 border border-green-200">
									<div className="flex items-center gap-2 mb-6">
										<Zap className="w-6 h-6 text-green-600" />
										<h4 className="font-semibold text-slate-800 text-lg">
											Прогноз растущих товаров
										</h4>
									</div>
									<div className="space-y-3">
										<div className="bg-white rounded-lg p-4 border border-green-100 hover:border-green-300 transition-colors">
											<div className="flex items-start justify-between mb-2">
												<h5 className="font-medium text-slate-800">Кольца с опалом</h5>
												<span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded-full">
													+127%
												</span>
											</div>
											<p className="text-sm text-slate-600 mb-2">
												Прогноз: 450+ запросов в следующий месяц
											</p>
											<div className="w-full bg-slate-200 rounded-full h-1.5">
												<div
													className="bg-green-500 h-1.5 rounded-full"
													style={{ width: '85%' }}></div>
											</div>
											<span className="text-xs text-green-700 font-medium mt-2 block">
												Тренд: молодежь и экологичные материалы
											</span>
										</div>

										<div className="bg-white rounded-lg p-4 border border-green-100 hover:border-green-300 transition-colors">
											<div className="flex items-start justify-between mb-2">
												<h5 className="font-medium text-slate-800">
													Украшения из золота 585 пробы
												</h5>
												<span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded-full">
													+89%
												</span>
											</div>
											<p className="text-sm text-slate-600 mb-2">
												Прогноз: 380+ запросов в следующий месяц
											</p>
											<div className="w-full bg-slate-200 rounded-full h-1.5">
												<div
													className="bg-green-500 h-1.5 rounded-full"
													style={{ width: '72%' }}></div>
											</div>
											<span className="text-xs text-green-700 font-medium mt-2 block">
												Тренд: популярная цена и качество
											</span>
										</div>

										<div className="bg-white rounded-lg p-4 border border-green-100 hover:border-green-300 transition-colors">
											<div className="flex items-start justify-between mb-2">
												<h5 className="font-medium text-slate-800">Серьги-люстры</h5>
												<span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded-full">
													+156%
												</span>
											</div>
											<p className="text-sm text-slate-600 mb-2">
												Прогноз: 290+ запросов в следующий месяц
											</p>
											<div className="w-full bg-slate-200 rounded-full h-1.5">
												<div
													className="bg-green-500 h-1.5 rounded-full"
													style={{ width: '95%' }}></div>
											</div>
											<span className="text-xs text-green-700 font-medium mt-2 block">
												Тренд: вечерний стиль и праздничные события
											</span>
										</div>

										<div className="bg-white rounded-lg p-4 border border-green-100 hover:border-green-300 transition-colors">
											<div className="flex items-start justify-between mb-2">
												<h5 className="font-medium text-slate-800">
													Кольца с морганитом
												</h5>
												<span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded-full">
													+143%
												</span>
											</div>
											<p className="text-sm text-slate-600 mb-2">
												Прогноз: 210+ запросов в следующий месяц
											</p>
											<div className="w-full bg-slate-200 rounded-full h-1.5">
												<div
													className="bg-green-500 h-1.5 rounded-full"
													style={{ width: '78%' }}></div>
											</div>
											<span className="text-xs text-green-700 font-medium mt-2 block">
												Тренд: розовое золото и нежные камни
											</span>
										</div>
									</div>
								</div>
							</div>

							{analysis?.insights?.length && (
								<div className="bg-amber-50 rounded-xl p-6 border border-amber-200 flex items-start gap-4">
									<AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
									<div>
										<h4 className="font-semibold text-slate-800 mb-2">
											Обратить внимание на
										</h4>
										<ul className="text-sm text-slate-700 space-y-1">
											{analysis?.insights?.map((el, i) => (
												<li key={i}>{el}</li>
											))}
										</ul>
									</div>
								</div>
							)}

							{analysis?.popular_styles?.length && (
								<div className="bg-amber-50 rounded-xl p-6 border border-amber-200 flex items-start gap-4">
									<AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
									<div>
										<h4 className="font-semibold text-slate-800 mb-2">
											Рекомендации по стилям
										</h4>
										<ul className="text-sm text-slate-700 space-y-1">
											{analysis?.popular_styles?.map((el, i) => (
												<li key={i}>{el}</li>
											))}
										</ul>
									</div>
								</div>
							)}
						</div>
					)}

					{activeTab === 'settings' && (
						<div className="space-y-6">
							<h3 className="font-semibold text-slate-800 text-xl mb-6">
								Настройки бота
							</h3>

							<div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
								<h4 className="font-semibold text-slate-800 mb-4">Интеграции</h4>
								<div className="space-y-4">
									<div className="flex items-center justify-between p-4 bg-white rounded-lg border border-slate-200">
										<div className="flex items-center gap-4">
											<div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
												<Globe className="w-6 h-6 text-blue-600" />
											</div>
											<div>
												<h5 className="font-medium text-slate-800">
													Встраивание на сайт
												</h5>
												<p className="text-sm text-slate-600">
													Widget для любого веб-сайта
												</p>
											</div>
										</div>
										<button className="px-4 py-2 bg-green-100 text-green-700 rounded-lg font-medium text-sm">
											Активно
										</button>
									</div>

									<div className="flex items-center justify-between p-4 bg-white rounded-lg border border-slate-200">
										<div className="flex items-center gap-4">
											<div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center">
												<MessageSquare className="w-6 h-6 text-cyan-600" />
											</div>
											<div>
												<h5 className="font-medium text-slate-800">Telegram Bot</h5>
												<p className="text-sm text-slate-600">@jewelbot_assistant</p>
											</div>
										</div>
										<button className="px-4 py-2 bg-green-100 text-green-700 rounded-lg font-medium text-sm">
											Активно
										</button>
									</div>

									<div className="flex items-center justify-between p-4 bg-white rounded-lg border border-slate-200">
										<div className="flex items-center gap-4">
											<div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
												<Bot className="w-6 h-6 text-purple-600" />
											</div>
											<div>
												<h5 className="font-medium text-slate-800">API для партнеров</h5>
												<p className="text-sm text-slate-600">REST API для интеграции</p>
											</div>
										</div>
										<button className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-medium text-sm hover:bg-slate-200 transition-colors">
											Настроить
										</button>
									</div>
								</div>
							</div>

							<div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
								<h4 className="font-semibold text-slate-800 mb-4">Настройки AI</h4>
								<div className="space-y-4">
									<div>
										<label className="block text-sm font-medium text-slate-700 mb-2">
											Тон общения
										</label>
										<select className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500">
											<option>Дружелюбный и профессиональный</option>
											<option>Формальный</option>
											<option>Неформальный</option>
										</select>
									</div>

									<div>
										<label className="block text-sm font-medium text-slate-700 mb-2">
											Язык по умолчанию
										</label>
										<select className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500">
											<option>Русский</option>
											<option>English</option>
											<option>Определять автоматически</option>
										</select>
									</div>

									<div className="flex items-center justify-between p-4 bg-white rounded-lg border border-slate-200">
										<div>
											<h5 className="font-medium text-slate-800">
												Автоматические ответы
											</h5>
											<p className="text-sm text-slate-600">
												Бот отвечает на типовые вопросы
											</p>
										</div>
										<label className="relative inline-flex items-center cursor-pointer">
											<input type="checkbox" className="sr-only peer" defaultChecked />
											<div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
										</label>
									</div>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
