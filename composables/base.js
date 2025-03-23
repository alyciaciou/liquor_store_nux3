import axios from "axios";

const { VITE_APP_BASE_URL } = import.meta.env;

const instance  = axios.create({
    baseURL: `${VITE_APP_BASE_URL}`
});

instance.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    config => {
        return config;
    },
    error => {
        let message = {
            error,
        };
        switch (error.response.status) {
            case 400:
                message['status'] = "參數有誤";
                break;
            case 401:
                message['status'] = "未登入授權，請先登入";
                break;
            case 403:
                message['status'] = "您沒有操作權限";
                break;
            case 404:
                message['status'] = `請求地址有誤：${error.response.config.url}`;
                break;
            case 408:
                message['status'] = "請求超時，請重新操作";
                break;
            case 500:
                message['status'] = "伺服器內部錯誤";
                break;
            case 504:
                message['status'] = "伺服器暫時無法訪問，請稍後再試";
                break;
            default:
                message['status'] = "異常問題，請聯絡管理員";
                break;
        };
        return Promise.reject(message);
    }
);

const GET = async (url, params) => {
    try {
        const response = await instance.get(url, { params });
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
};

const POST = async (url, data) => {
    try {
        const response = await instance.post(url, data);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
};

const DELETE = async (url) => {
    try{
        const response = await instance.delete(url);
        return response.data;
    }
    catch(error){
        return Promise.reject(error);
    }
};

const PUT = async (url, data) => {
    try {
        const response = await instance.put(url, data);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
};



export { GET, POST, DELETE, PUT };