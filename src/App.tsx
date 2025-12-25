import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import ClientView from './components/ClientView';
import AdminView from './components/AdminView';
import ChatPage from './pages/ChatPage';
import ProductsPage from './pages/ProductsPage';
import { Gem } from 'lucide-react';

function Navigation() {
	const location = useLocation();
	const isMainPage = location.pathname === '/';
	const isClientView = location.pathname === '/' || location.pathname.startsWith('/client');

	return (
		<nav className="bg-white border-b border-slate-200 shadow-sm">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					<Link to="/" className="flex items-center gap-2">
						<Gem className="w-8 h-8 text-amber-600" />
						<h1 className="text-xl font-semibold text-slate-800">JewelBot</h1>
					</Link>
					<div className="flex gap-2">
						{isMainPage ? (
							<>
								<Link
									to="/"
									className={`px-4 py-2 rounded-lg font-medium transition-all ${
										isClientView
											? 'bg-amber-600 text-white shadow-md'
											: 'bg-slate-100 text-slate-600 hover:bg-slate-200'
									}`}>
									Клиентский вид
								</Link>
								<Link
									to="/admin"
									className={`px-4 py-2 rounded-lg font-medium transition-all ${
										location.pathname === '/admin'
											? 'bg-amber-600 text-white shadow-md'
											: 'bg-slate-100 text-slate-600 hover:bg-slate-200'
									}`}>
									Панель для бизнеса
								</Link>
							</>
						) : (
							<Link
								to="/"
								className="px-4 py-2 rounded-lg font-medium bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all">
								На главную
							</Link>
						)}
					</div>
				</div>
			</div>
		</nav>
	);
}

function App() {
	return (
		<BrowserRouter>
			<div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
				<Navigation />
				<Routes>
					<Route path="/" element={<ClientView />} />
					<Route path="/admin" element={<AdminView />} />
					<Route path="/chat" element={<ChatPage />} />
					<Route path="/products" element={<ProductsPage />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
