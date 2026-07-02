import { useApi } from '@/composables/base';

export interface Product {
    brand: string;
    category: string;
    content: string;
    description: string;
    id: string;
    imageUrl: string;
    is_enabled: number;
    num: number;
    origin_price: number;
    price: number;
    title: string;
    type: string;
    unit: string;
}

export interface ProductsQuery {
    page: number;
    category: string;
}

export interface Pagination {
    total_pages: number;
}

/** GET /products/all */
export interface AllProductsResponse {
    products: Product[];
}

/** GET /products?page=&category= */
export interface ProductsResponse {
    products: Product[];
    pagination: Pagination;
}

/** GET /product/:id */
export interface ProductInfoResponse {
    product: Product;
}

export const useProductApi = () => {
    const getAllProducts = () => {
        const { GET } = useApi();
        return GET<AllProductsResponse>('products/all');
    };

    const getProducts = (queryInfo: ProductsQuery) => {
        const { GET } = useApi();
        return GET<ProductsResponse>('products', queryInfo);
    };

    const getProductInfo = (id: string) => {
        const { GET } = useApi();
        return GET<ProductInfoResponse>(`product/${id}`);
    };

    return { getProducts, getProductInfo, getAllProducts };
};
