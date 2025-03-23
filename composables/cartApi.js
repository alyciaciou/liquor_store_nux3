import { GET, POST, PUT, DELETE } from '@/composables/base';

const { BASE_URL } = import.meta.env;
const addTocart = ( data ) => {
    const res = POST(`/api${BASE_URL}cart`, data);
    return res;
};

const getCartInfo = () => {
    const res = GET(`/api${BASE_URL}cart`);
    return res;
};

const updateCartItem = ( id, data ) => {
    const res = PUT(`/api${BASE_URL}cart/${id}`, data);
    return res;
};

const deleteCartItem = ( id ) => {
    const res = DELETE(`/api${BASE_URL}cart/${id}`);
    return res;
};


export { addTocart, getCartInfo, updateCartItem, deleteCartItem }