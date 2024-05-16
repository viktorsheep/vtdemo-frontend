import type { UseFetchOptions } from 'nuxt/app'
import { useRequestHeaders } from "nuxt/app";

export function useApiFetch<T>(path: string, options: UseFetchOptions<T> = {}) {
  const config = useRuntimeConfig()

  let headers: any = {
    accept: 'application/json',
    referer: "http://localhost:3001",
    origin: 'http://localhost:3001'
  }

  // const token = useCookie('XSRF-TOKEN', {sameSite: 'none'})
  const token = JSON.parse(localStorage.getItem('user_token') || 'null')

  if (token !== null) {
    // headers['X-XSRF-TOKEN'] = token.value as string
    headers['Authorization'] = 'Bearer ' + token
  }

  if (process.server) {
    headers = {
      ...headers,
      ...useRequestHeaders(["cookie"]),
    }
  }

  return useFetch(config.public.publicBase + path, {
    credentials: "include",
    watch: false,
    ...options,
    headers: {
      ...headers,
      ...options?.headers
    },

    onResponse(context) {
      // console.log(context.response.headers)
    }
  });
}
