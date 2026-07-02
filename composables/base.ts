import axios, { type AxiosError } from 'axios';

interface ApiError {
    error: AxiosError;
    status: string;
}

export const useApi = () => {
    const { baseUrl, appBase } = useRuntimeConfig().public;

    const instance = axios.create({
        baseURL: baseUrl,
    });

    instance.interceptors.request.use(
        (config) => config,
        (error) => Promise.reject(error)
    );

    instance.interceptors.response.use(
        (config) => config,
        (error: AxiosError) => {
            const message: ApiError = { error, status: '' };

            switch (error.response?.status) {
                case 400:
                    message.status = '參數有誤';
                    break;
                case 401:
                    message.status = '未登入授權，請先登入';
                    break;
                case 403:
                    message.status = '您沒有操作權限';
                    break;
                case 404:
                    message.status = `請求地址有誤：${error.response?.config?.url ?? ''}`;
                    break;
                case 408:
                    message.status = '請求超時，請重新操作';
                    break;
                case 500:
                    message.status = '伺服器內部錯誤';
                    break;
                case 504:
                    message.status = '伺服器暫時無法訪問，請稍後再試';
                    break;
                default:
                    message.status = '異常問題，請聯絡管理員';
                    break;
            }
            return Promise.reject(message);
        }
    );

    const GET = async <T>(path: string, params?: object): Promise<T> => {
        const res = await instance.get<T>(`/api${appBase}${path}`, { params });
        return res.data;
    };

    const POST = async <T>(path: string, data?: unknown): Promise<T> => {
        const res = await instance.post<T>(`/api${appBase}${path}`, data);
        return res.data;
    };

    const PUT = async <T>(path: string, data?: unknown): Promise<T> => {
        const res = await instance.put<T>(`/api${appBase}${path}`, data);
        return res.data;
    };

    const DELETE = async <T>(path: string): Promise<T> => {
        const res = await instance.delete<T>(`/api${appBase}${path}`);
        return res.data;
    };

    return { GET, POST, PUT, DELETE };
};
