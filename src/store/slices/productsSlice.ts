import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Product, ProductsFilter, ProductsState } from '../../types/product';

// Моковые данные для демонстрации
const mockProducts: Product[] = [
	{
		id: '1',
		name: 'Обручальное кольцо "Классика"',
		category: 'rings',
		description:
			'Элегантное обручальное кольцо классического дизайна из белого золота 585 пробы',
		metal: { type: 'gold', color: 'white', purity: '585' },
		gems: { type: 'none' },
		price: 45000,
		images: ['/images/ring1.jpg'],
		inStock: true,
		sku: 'R001',
		createdAt: new Date('2024-01-15'),
	},
	{
		id: '2',
		name: 'Кольцо с бриллиантом "Роял"',
		category: 'rings',
		description:
			'Помолвочное кольцо с центральным бриллиантом 0.5 карата в оправе из белого золота',
		metal: { type: 'gold', color: 'white', purity: '750' },
		gems: { type: 'diamond', count: 1, carat: 0.5 },
		price: 285000,
		images: ['/images/ring2.jpg'],
		inStock: true,
		sku: 'R002',
		createdAt: new Date('2024-02-10'),
	},
	{
		id: '3',
		name: 'Кольцо с опалом "Морская волна"',
		category: 'rings',
		description: 'Эксклюзивное кольцо с опалом в оправе из желтого золота',
		metal: { type: 'gold', color: 'yellow', purity: '585' },
		gems: { type: 'opal', count: 1, carat: 0.8 },
		price: 125000,
		images: ['/images/ring3.jpg'],
		inStock: true,
		sku: 'R003',
		createdAt: new Date('2024-03-05'),
	},
	{
		id: '4',
		name: 'Колье с сапфирами "Небесная красота"',
		category: 'necklaces',
		description: 'Изысканное колье с сапфирами и бриллиантами на цепи из белого золота',
		metal: { type: 'gold', color: 'white', purity: '750' },
		gems: { type: 'sapphire', count: 7, carat: 2.5 },
		price: 450000,
		images: ['/images/necklace1.jpg'],
		inStock: true,
		sku: 'N001',
		createdAt: new Date('2024-01-20'),
	},
	{
		id: '5',
		name: 'Колье с морганитом "Романтик"',
		category: 'necklaces',
		description: 'Нежное колье с морганитом в розовом золоте',
		metal: { type: 'gold', color: 'rose', purity: '585' },
		gems: { type: 'morganite', count: 1, carat: 1.2 },
		price: 98000,
		images: ['/images/necklace2.jpg'],
		inStock: true,
		sku: 'N002',
		createdAt: new Date('2024-02-15'),
	},
	{
		id: '6',
		name: 'Серьги-люстры "Вечерняя звезда"',
		category: 'earrings',
		description: 'Элегантные серьги-люстры с бриллиантами в белом золоте',
		metal: { type: 'gold', color: 'white', purity: '750' },
		gems: { type: 'diamond', count: 24, carat: 1.5 },
		price: 320000,
		images: ['/images/earring1.jpg'],
		inStock: true,
		sku: 'E001',
		createdAt: new Date('2024-01-25'),
	},
	{
		id: '7',
		name: 'Серьги с сапфирами "Королевские"',
		category: 'earrings',
		description: 'Каплевидные серьги с сапфирами в желтом золоте',
		metal: { type: 'gold', color: 'yellow', purity: '585' },
		gems: { type: 'sapphire', count: 2, carat: 0.8 },
		price: 175000,
		images: ['/images/earring2.jpg'],
		inStock: true,
		sku: 'E002',
		createdAt: new Date('2024-02-20'),
	},
	{
		id: '8',
		name: 'Браслет из серебра "Минималист"',
		category: 'bracelets',
		description: 'Простой и элегантный браслет из стерлингового серебра',
		metal: { type: 'silver', color: 'white', purity: '925' },
		gems: { type: 'none' },
		price: 8500,
		images: ['/images/bracelet1.jpg'],
		inStock: true,
		sku: 'B001',
		createdAt: new Date('2024-01-10'),
	},
	{
		id: '9',
		name: 'Брошь винтажная "Цветок"',
		category: 'brooches',
		description: 'Винтажная брошь в виде цветка с эмалью',
		metal: { type: 'gold', color: 'yellow', purity: '585' },
		gems: { type: 'none' },
		price: 35000,
		images: ['/images/brooch1.jpg'],
		inStock: false,
		sku: 'BR001',
		createdAt: new Date('2023-12-15'),
	},
];

const filterProducts = (products: Product[], filter: ProductsFilter): Product[] => {
	return products.filter((product) => {
		if (filter.category && product.category !== filter.category) return false;
		if (filter.metalType && product.metal.type !== filter.metalType) return false;
		if (filter.metalColor && product.metal.color !== filter.metalColor) return false;
		if (filter.gemType && product.gems.type !== filter.gemType) return false;
		if (filter.priceRange) {
			if (product.price < filter.priceRange.min || product.price > filter.priceRange.max)
				return false;
		}
		if (filter.inStock && !product.inStock) return false;
		if (filter.searchQuery) {
			const query = filter.searchQuery.toLowerCase();
			if (
				!product.name.toLowerCase().includes(query) &&
				!product.description.toLowerCase().includes(query)
			)
				return false;
		}
		return true;
	});
};

const initialState: ProductsState = {
	products: mockProducts,
	filteredProducts: mockProducts,
	filter: {},
	loading: false,
	error: null,
	selectedProduct: null,
};

const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		setProducts: (state, action: PayloadAction<Product[]>) => {
			state.products = action.payload;
			state.filteredProducts = filterProducts(action.payload, state.filter);
		},
		setFilter: (state, action: PayloadAction<Partial<ProductsFilter>>) => {
			state.filter = { ...state.filter, ...action.payload };
			state.filteredProducts = filterProducts(state.products, state.filter);
		},
		clearFilter: (state) => {
			state.filter = {};
			state.filteredProducts = state.products;
		},
		setSelectedProduct: (state, action: PayloadAction<Product | null>) => {
			state.selectedProduct = action.payload;
		},
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.loading = action.payload;
		},
		setError: (state, action: PayloadAction<string | null>) => {
			state.error = action.payload;
		},
	},
});

export const {
	setProducts,
	setFilter,
	clearFilter,
	setSelectedProduct,
	setLoading,
	setError,
} = productsSlice.actions;

export default productsSlice.reducer;
