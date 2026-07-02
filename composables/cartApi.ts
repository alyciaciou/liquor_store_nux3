import { useApi } from '@/composables/base';
import type { Product } from '@/composables/productApi';

export interface CartItem {
    final_total: number;
    id: string;
    product_id: string;
    qty: number;
    total: number;
    product: Product;
}

export interface CartInfo {
    carts: CartItem[];
    final_total: number;
    total: number;
}

/** hexschool API 常見的回應格式：{ data: ... } */
export interface ApiDataResponse<T> {
    data: T;
}

/** 新增 / 更新購物車時送出的 body */
export interface CartItemPayload {
    data: {
        product_id: string;
        qty: number;
    };
}

export const useCartApi = () => {
    const addTocart = (data: CartItemPayload) => {
        const { POST } = useApi();
        return POST<ApiDataResponse<CartItem>>('cart', data);
    };

    const getCartInfo = () => {
        const { GET } = useApi();
        return GET<ApiDataResponse<CartInfo>>('cart');
    };

    const updateCartItem = (id: string, data: CartItemPayload) => {
        const { PUT } = useApi();
        return PUT<ApiDataResponse<CartItem>>(`cart/${id}`, data);
    };

    const deleteCartItem = (id: string) => {
        const { DELETE } = useApi();
        return DELETE<ApiDataResponse<CartItem>>(`cart/${id}`);
    };

    return { addTocart, getCartInfo, updateCartItem, deleteCartItem };
};
