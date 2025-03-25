import { useApi } from "@/composables/base";

export const usePaymentApi = () => {
    const { POST } = useApi();
    const confirmPayment = (orderId) => POST(`pay/${orderId}`);

    return { confirmPayment };
};
