import { GET } from '@/composables/base';

const { BASE_URL } = import.meta.env;

const getAllProducts = () => {
    const res = GET(`/api${BASE_URL}products/all`);
    return res;
};

const getProducts = (queryInfo) => {
    const res = GET(`/api${BASE_URL}products`, queryInfo);
    return res;
};

const getProductInfo = ( id ) => {
    const res = GET(`/api${BASE_URL}product/${id}`);
    return res;
};

export { getProducts, getProductInfo, getAllProducts }