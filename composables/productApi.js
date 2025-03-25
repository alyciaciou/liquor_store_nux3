import { useApi } from "@/composables/base";

export const useProductApi = () => {
    const { GET } = useApi();

    const getAllProducts = () => GET("products/all");

    const getProducts = (queryInfo) => GET("products", queryInfo);

    const getProductInfo = (id) => GET(`product/${id}`);

    return { getProducts, getProductInfo, getAllProducts };
};
