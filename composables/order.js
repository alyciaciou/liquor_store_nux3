import { useApi } from "@/composables/base";

export const useOrderApi = () => {
    const { POST, GET } = useApi();

    const submitOrder = (data) => POST("order", data);

    const getOrder = (id) => GET(`order/${id}`);

    return { submitOrder, getOrder };
};
