import { useApi } from "@/composables/base";

export const useCartApi = () => {
    const addTocart = (data) => {
        const { POST } = useApi();
        return POST("cart", data);
    };

    const getCartInfo = () => {
        const { GET } = useApi();
        return GET("cart");
    };

    const updateCartItem = (id, data) => {
        const { PUT } = useApi();
        return PUT(`cart/${id}`, data);
    };

    const deleteCartItem = (id) => {
        const { DELETE } = useApi();
        return DELETE(`cart/${id}`);
    };

    return { addTocart, getCartInfo, updateCartItem, deleteCartItem };
};
