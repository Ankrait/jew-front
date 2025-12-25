export type MetalType = 'gold' | 'silver' | 'platinum';
export type MetalColor = 'white' | 'yellow' | 'rose';
export type ProductCategory = 'rings' | 'necklaces' | 'earrings' | 'bracelets' | 'brooches';
export type GemType = 'diamond' | 'sapphire' | 'ruby' | 'emerald' | 'opal' | 'morganite' | 'none';

export interface Product {
	id: string;
	name: string;
	category: ProductCategory;
	description: string;
	metal: {
		type: MetalType;
		color: MetalColor;
		purity: string; // например "585" или "750"
	};
	gems: {
		type: GemType;
		count?: number;
		carat?: number;
	};
	price: number;
	images: string[];
	inStock: boolean;
	sku: string;
	createdAt: Date;
}

export interface ProductsFilter {
	category?: ProductCategory;
	metalType?: MetalType;
	metalColor?: MetalColor;
	gemType?: GemType;
	priceRange?: {
		min: number;
		max: number;
	};
	inStock?: boolean;
	searchQuery?: string;
}

export interface ProductsState {
	products: Product[];
	filteredProducts: Product[];
	filter: ProductsFilter;
	loading: boolean;
	error: string | null;
	selectedProduct: Product | null;
}
