import axios from 'axios'

export const useApi = () => {
  const { baseUrl, appBase } = useRuntimeConfig().public

  const instance = axios.create({
    baseURL: baseUrl,
  })

  instance.interceptors.request.use(
    config => config,
    error => Promise.reject(error)
  )

  instance.interceptors.response.use(
    config => config,
    error => {
      const message = { error }
      switch (error.response?.status) {
        case 400:
          message.status = '參數有誤'
          break
        case 401:
          message.status = '未登入授權，請先登入'
          break
        case 403:
          message.status = '您沒有操作權限'
          break
        case 404:
          message.status = `請求地址有誤：${error.response.config.url}`
          break
        case 408:
          message.status = '請求超時，請重新操作'
          break
        case 500:
          message.status = '伺服器內部錯誤'
          break
        case 504:
          message.status = '伺服器暫時無法訪問，請稍後再試'
          break
        default:
          message.status = '異常問題，請聯絡管理員'
          break
      }
      return Promise.reject(message)
    }
  )

  const GET = async (path, params) => {
    try {
      const res = await instance.get(`/api${appBase}${path}`, { params })
      return res.data
    } catch (error) {
      return Promise.reject(error)
    }
  }

  const POST = async (path, data) => {
    try {
      const res = await instance.post(`/api${appBase}${path}`, data)
      return res.data
    } catch (error) {
      return Promise.reject(error)
    }
  }

  const PUT = async (path, data) => {
    try {
      const res = await instance.put(`/api${appBase}${path}`, data)
      return res.data
    } catch (error) {
      return Promise.reject(error)
    }
  }

  const DELETE = async (path) => {
    try {
      const res = await instance.delete(`/api${appBase}${path}`)
      return res.data
    } catch (error) {
      return Promise.reject(error)
    }
  }

  return { GET, POST, PUT, DELETE }
}
