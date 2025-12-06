import { useState } from 'react';
import ClientView from './components/ClientView';
import AdminView from './components/AdminView';
import { Gem } from 'lucide-react';

function App() {
	const [view, setView] = useState<'client' | 'admin'>('client');

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
			<nav className="bg-white border-b border-slate-200 shadow-sm">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between items-center h-16">
						<div className="flex items-center gap-2">
							<Gem className="w-8 h-8 text-amber-600" />
							<h1 className="text-xl font-semibold text-slate-800">JewelBot</h1>
						</div>
						<div className="flex gap-2">
							<button
								onClick={() => setView('client')}
								className={`px-4 py-2 rounded-lg font-medium transition-all ${
									view === 'client'
										? 'bg-amber-600 text-white shadow-md'
										: 'bg-slate-100 text-slate-600 hover:bg-slate-200'
								}`}>
								Клиентский вид
							</button>
							<button
								onClick={() => setView('admin')}
								className={`px-4 py-2 rounded-lg font-medium transition-all ${
									view === 'admin'
										? 'bg-amber-600 text-white shadow-md'
										: 'bg-slate-100 text-slate-600 hover:bg-slate-200'
								}`}>
								Панель для бизнеса
							</button>
						</div>
					</div>
				</div>
			</nav>

			<main>{view === 'client' ? <ClientView /> : <AdminView />}</main>
		</div>
	);
}

export default App;
