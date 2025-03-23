import { POST } from '@/composables/base';

const { BASE_URL } = import.meta.env;

const confirmPayment = ( orderId ) => {
    const res = POST(`/api${BASE_URL}pay/${orderId}`);
    return res;
};


export { confirmPayment }