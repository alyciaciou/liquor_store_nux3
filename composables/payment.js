import { useApi } from "@/composables/base";

export const usePaymentApi = () => {
    const confirmPayment = (orderId) => {
        const { POST } = useApi();
        return POST(`pay/${orderId}`);
    };

    return { confirmPayment };
};
