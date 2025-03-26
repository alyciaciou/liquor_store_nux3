import { useApi } from "@/composables/base";

export const useProductApi = () => {
    const getAllProducts = () => {
        const { GET } = useApi();
        return GET("products/all");
    };

    const getProducts = (queryInfo) => {
        const { GET } = useApi();
        return GET("products", queryInfo);
    };

    const getProductInfo = (id) => {
        const { GET } = useApi();
        return GET(`product/${id}`);
    };

    return { getProducts, getProductInfo, getAllProducts };
};
