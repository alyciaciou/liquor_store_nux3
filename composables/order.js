import { GET, POST } from '@/composables/base';

const { BASE_URL } = import.meta.env;

const submitOrder = ( data ) => {
    const res = POST(`/api${BASE_URL}order`, data);
    return res;
};

const getOrder = (id) => {
    const res = GET(`/api${BASE_URL}order/${id}`);
    return res;
};

export { submitOrder, getOrder }