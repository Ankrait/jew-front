import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../store/slices/productsSlice';
import type { AppDispatch } from '../store/index';
import type { ProductCategory, MetalType, MetalColor } from '../types/product';
import { ArrowLeft, Search, SlidersHorizontal, Gem } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { RootState } from '../store';

const categoryEmojis: Record<ProductCategory, string> = {
	rings: '💍',
	necklaces: '📿',
	earrings: '💎',
	bracelets: '⌚',
	brooches: '🌸',
};

const categoryNames: Record<ProductCategory, string> = {
	rings: 'Кольца',
	necklaces: 'Ожерелья',
	earrings: 'Серьги',
	bracelets: 'Браслеты',
	brooches: 'Броши',
};

const metalNames: Record<MetalType, string> = {
	gold: 'Золото',
	silver: 'Серебро',
	platinum: 'Платина',
};

const colorNames: Record<MetalColor, string> = {
	white: 'Белое',
	yellow: 'Желтое',
	rose: 'Розовое',
};

export default function ProductsPage() {
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const { filteredProducts: products } = useSelector(
		(state: RootState) => state.products
	);

	const [searchQuery, setSearchQuery] = useState('');
	const [showFilters, setShowFilters] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>(
		'all'
	);
	const [selectedMetal, setSelectedMetal] = useState<MetalType | 'all'>('all');
	const [selectedColor, setSelectedColor] = useState<MetalColor | 'all'>('all');

	const handleCategoryChange = (category: ProductCategory | 'all') => {
		setSelectedCategory(category);
		dispatch(
			setFilter({
				category: category === 'all' ? undefined : category,
			})
		);
	};

	const handleSearch = (value: string) => {
		setSearchQuery(value);
		dispatch(setFilter({ searchQuery: value }));
	};

	// Apply category from URL query param
	useEffect(() => {
		const categoryParam = searchParams.get('category');
		if (categoryParam && Object.keys(categoryNames).includes(categoryParam)) {
			setSelectedCategory(categoryParam as ProductCategory);
			dispatch(
				setFilter({
					category: categoryParam as ProductCategory,
				})
			);
		}
	}, [dispatch, searchParams]);

	const handleMetalChange = (metal: MetalType | 'all') => {
		setSelectedMetal(metal);
		dispatch(
			setFilter({
				metalType: metal === 'all' ? undefined : metal,
			})
		);
	};

	const handleColorChange = (color: MetalColor | 'all') => {
		setSelectedColor(color);
		dispatch(
			setFilter({
				metalColor: color === 'all' ? undefined : color,
			})
		);
	};
	console.log(1);

	const formatPrice = (price: number) => {
		return new Intl.NumberFormat('ru-RU').format(price) + ' ₽';
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
			<header className="bg-purple-100 border-b border-slate-200 shadow-sm sticky top-0 z-10">
				<div className="max-w-7xl mx-auto px-4 py-4">
					<div className="flex items-center gap-4 mb-4">
						<button
							onClick={() => navigate('/')}
							className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
							<ArrowLeft className="w-6 h-6 text-slate-600" />
						</button>
						<h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
							<Gem className="w-8 h-8 text-purple-600" />
							Каталог украшений
						</h1>
					</div>

					{/* Search bar */}
					<div className="flex gap-3">
						<div className="flex-1 relative">
							<Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
							<input
								type="text"
								value={searchQuery}
								onChange={(e) => handleSearch(e.target.value)}
								placeholder="Поиск по названию или описанию..."
								className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
							/>
						</div>
						<button
							onClick={() => setShowFilters(!showFilters)}
							className={`px-4 py-3 rounded-xl transition-all ${showFilters
								? 'bg-purple-600 text-white'
								: 'bg-slate-100 text-slate-600 hover:bg-slate-200'
								}`}>
							<SlidersHorizontal className="w-5 h-5" />
						</button>
					</div>
				</div>
			</header>

			<main className="max-w-7xl mx-auto px-4 py-8">
				<div className="flex gap-8">
					{/* Filters sidebar */}
					{showFilters && (
						<aside className="w-72 flex-shrink-0">
							<div className="bg-purple-100 rounded-xl shadow-md p-6 sticky top-32">
								<h2 className="text-lg font-semibold text-slate-800 mb-4">Фильтры</h2>

								{/* Category filter */}
								<div className="mb-6">
									<h3 className="font-medium text-slate-700 mb-3">Категория</h3>
									<div className="space-y-2">
										<button
											onClick={() => handleCategoryChange('all')}
											className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${selectedCategory === 'all'
												? 'bg-purple-100 text-purple-700 font-medium'
												: 'hover:bg-slate-50 text-slate-600'
												}`}>
											Все категории
										</button>
										{Object.entries(categoryNames).map(([key, name]) => (
											<button
												key={key}
												onClick={() => handleCategoryChange(key as ProductCategory)}
												className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${selectedCategory === key
													? 'bg-purple-100 text-purple-700 font-medium'
													: 'hover:bg-slate-50 text-slate-600'
													}`}>
												<span className="mr-2">
													{categoryEmojis[key as ProductCategory]}
												</span>
												{name}
											</button>
										))}
									</div>
								</div>

								{/* Metal filter */}
								<div className="mb-6">
									<h3 className="font-medium text-slate-700 mb-3">Металл</h3>
									<div className="space-y-2">
										<button
											onClick={() => handleMetalChange('all')}
											className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${selectedMetal === 'all'
												? 'bg-purple-100 text-purple-700 font-medium'
												: 'hover:bg-slate-50 text-slate-600'
												}`}>
											Все металлы
										</button>
										{Object.entries(metalNames).map(([key, name]) => (
											<button
												key={key}
												onClick={() => handleMetalChange(key as MetalType)}
												className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${selectedMetal === key
													? 'bg-purple-100 text-purple-700 font-medium'
													: 'hover:bg-slate-50 text-slate-600'
													}`}>
												{name}
											</button>
										))}
									</div>
								</div>

								{/* Color filter */}
								<div className="mb-6">
									<h3 className="font-medium text-slate-700 mb-3">Цвет металла</h3>
									<div className="space-y-2">
										<button
											onClick={() => handleColorChange('all')}
											className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${selectedColor === 'all'
												? 'bg-purple-100 text-purple-700 font-medium'
												: 'hover:bg-slate-50 text-slate-600'
												}`}>
											Все цвета
										</button>
										{Object.entries(colorNames).map(([key, name]) => (
											<button
												key={key}
												onClick={() => handleColorChange(key as MetalColor)}
												className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${selectedColor === key
													? 'bg-purple-100 text-purple-700 font-medium'
													: 'hover:bg-slate-50 text-slate-600'
													}`}>
												{name}
											</button>
										))}
									</div>
								</div>
							</div>
						</aside>
					)}

					{/* Products grid */}
					<div className="flex-1">
						{products.length === 0 ? (
							<div className="bg-purple-100 rounded-xl shadow-md p-12 text-center">
								<Gem className="w-16 h-16 text-slate-300 mx-auto mb-4" />
								<p className="text-lg text-slate-600">
									Нет товаров, соответствующих выбранным фильтрам
								</p>
							</div>
						) : (
							<>
								<p className="text-slate-600 mb-6">Найдено товаров: {products.length}</p>
								<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
									{products.map((product) => (
										<div
											key={product.id}
											className="bg-purple-100 rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden group">
											<div className="relative h-64 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center overflow-hidden">
												<span className="text-7xl group-hover:scale-110 transition-transform">
													{categoryEmojis[product.category]}
												</span>
												{!product.inStock && (
													<div className="absolute inset-0 bg-black/50 flex items-center justify-center">
														<span className="text-white font-semibold text-lg bg-black/70 px-4 py-2 rounded-lg">
															Нет в наличии
														</span>
													</div>
												)}
											</div>
											<div className="p-5">
												<h3 className="font-semibold text-slate-800 text-lg mb-2">
													{product.name}
												</h3>
												<p className="text-sm text-slate-600 mb-3 line-clamp-2">
													{product.description}
												</p>
												<div className="flex items-center gap-2 mb-3 text-xs text-slate-500">
													<span className="bg-slate-100 px-2 py-1 rounded">
														{metalNames[product.metal.type]} {product.metal.purity}
													</span>
													<span className="bg-slate-100 px-2 py-1 rounded">
														{colorNames[product.metal.color]}
													</span>
												</div>
												<div className="flex items-center justify-between">
													<span className="text-xl font-bold text-purple-600">
														{formatPrice(product.price)}
													</span>
													<button
														onClick={() => navigate(`/chat`)}
														className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium">
														Консультация
													</button>
												</div>
											</div>
										</div>
									))}
								</div>
							</>
						)}
					</div>
				</div>
			</main>
		</div>
	);
}
