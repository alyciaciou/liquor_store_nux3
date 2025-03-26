import { useApi } from "@/composables/base";

export const useOrderApi = () => {
    const submitOrder = (data) => {
        const { POST } = useApi();
        return POST("order", data);
    };

    const getOrder = (id) => {
        const { GET } = useApi();
        return GET(`order/${id}`);
    };

    return { submitOrder, getOrder };
};
