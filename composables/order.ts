import { useApi } from '@/composables/base';
import type { Product } from '@/composables/productApi';

export interface OrderUser {
    name: string;
    email: string;
    tel: string;
    address: string;
}

export interface SubmitOrderPayload {
    data: {
        user: OrderUser;
        message: string;
    };
}

/** POST /order 回傳訂單編號 */
export interface SubmitOrderResponse {
    orderId: string;
}

export interface OrderProductItem {
    qty: number;
    total: number;
    product: Product;
}

export interface OrderInfo {
    id: string;
    user: OrderUser;
    message: string;
    is_paid: boolean;
    total: number;
    products: OrderProductItem[];
}

/** GET /order/:id 回傳訂單明細 */
export interface GetOrderResponse {
    order: OrderInfo;
}

export const useOrderApi = () => {
    const submitOrder = (data: SubmitOrderPayload) => {
        const { POST } = useApi();
        return POST<SubmitOrderResponse>('order', data);
    };

    const getOrder = (id: string) => {
        const { GET } = useApi();
        return GET<GetOrderResponse>(`order/${id}`);
    };

    return { submitOrder, getOrder };
};
