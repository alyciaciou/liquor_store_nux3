import { useApi } from "@/composables/base";

export const useCartApi = () => {
    const { POST, GET, DELETE, PUT } = useApi();

    const addTocart = (data) => POST("cart", data);
    const getCartInfo = () => GET("cart");
    const updateCartItem = (id, data) => PUT(`cart/${id}`, data);
    const deleteCartItem = (id) => DELETE(`cart/${id}`);

    return { addTocart, getCartInfo, updateCartItem, deleteCartItem };
};
