import { useApi } from '@/composables/base';

/** POST /pay/:orderId 付款確認回應 */
export interface ConfirmPaymentResponse {
    success: boolean;
    message: string;
}

export const usePaymentApi = () => {
    const confirmPayment = (orderId: string) => {
        const { POST } = useApi();
        return POST<ConfirmPaymentResponse>(`pay/${orderId}`);
    };

    return { confirmPayment };
};
