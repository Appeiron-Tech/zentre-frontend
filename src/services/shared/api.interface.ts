export type IAPIReq = {
  params?: any
  paramsSerializer?: (params: any) => string
  data?: any
  headers?: any
  timeout?: number
  timeoutErrorMessage?: string
  withCredentials?: boolean
  adapter?: any
  auth?: any
  responseType?: any
  responseEncoding?: any
  xsrfCookieName?: string
  xsrfHeaderName?: string
  onUploadProgress?: (progressEvent: any) => void
  onDownloadProgress?: (progressEvent: any) => void
  maxContentLength?: number
  validateStatus?: ((status: number) => boolean) | null
  maxBodyLength?: number
  maxRedirects?: number
  socketPath?: string | null
  httpAgent?: any
  httpsAgent?: any
  proxy?: any
  cancelToken?: any
  decompress?: boolean
  transitional?: any
  signal?: any
  insecureHTTPParser?: boolean
}
