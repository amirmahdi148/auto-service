import axios from "axios"

interface HttpParams {
    params?: Record<string, string | number | boolean | undefined>
    body?: unknown
    headers?: Record<string, string>
}

const BASE_URL = import.meta.env.VITE_API_URL ?? ""
const JWT = import.meta.env.VITE_JWT ?? ""

const TOKEN_KEY = "access_token"

const api = axios.create({ baseURL: BASE_URL })

if (JWT === "true") {
    api.interceptors.request.use((config) => {
        const token = localStorage.getItem(TOKEN_KEY)
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    })
}

function setJwt(token: string) {
    if (JWT !== "true") return
    localStorage.setItem(TOKEN_KEY, token)
}

function deleteJwt() {
    if (JWT !== "true") return
    localStorage.removeItem(TOKEN_KEY)
}

function cleanParams(params: Record<string, string | number | boolean | undefined>) {
    const cleaned: Record<string, string> = {}
    for (const [key, value] of Object.entries(params)) {
        if (value !== undefined) cleaned[key] = String(value)
    }
    return cleaned
}

async function request<T>(method: string, path: string, options: HttpParams = {}): Promise<T> {
    const { data } = await api.request<T>({
        method,
        url: path,
        params: options.params ? cleanParams(options.params) : undefined,
        data: options.body,
        headers: options.headers,
    })
    return data
}

export { setJwt, deleteJwt }

export const HttpService = {
    get<T>(path: string, options?: HttpParams) {
        return request<T>("GET", path, options)
    },
    post<T>(path: string, options?: HttpParams) {
        return request<T>("POST", path, options)
    },
    put<T>(path: string, options?: HttpParams) {
        return request<T>("PUT", path, options)
    },
    patch<T>(path: string, options?: HttpParams) {
        return request<T>("PATCH", path, options)
    },
    delete<T>(path: string, options?: HttpParams) {
        return request<T>("DELETE", path, options)
    },
}
