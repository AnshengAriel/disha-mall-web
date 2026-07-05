import axios from "axios"
import { useAppRouter } from '@/configs/router'
import { useAppCookies } from "@/main/composables/AppCookiesUse";
import { ERR_AUTH_FAILED, ERR_NO_INTERNET_CONNECTION, isSuccess } from "@/utils/errorcode";

const contentTypeForm = 'application/x-www-form-urlencoded;charset=UTF-8';
const contentTypeJson = 'application/json';
const contentTypeFile = 'multipart/form-data';
const {toLogin} = useAppRouter()

function request(config) {
  let {
    url = '', 
    params = {},
    method = 'post',
    type = 'form',
    isAuth = true,
  } = config

  let contentType
  let data = params
  if (type == 'form') {
    contentType = contentTypeForm
  }else if (type == 'json') {
    contentType = contentTypeJson
  }else if (type == 'file') {
    contentType = contentTypeFile
    let formData = new FormData();
    Object.entries(data).forEach((k,v) => formData.append(k, v))
    data = formData
  }else {
    throw new Error('未知的contentType: ' + type)
  }

  // axios会根据contentType自动封装data
  const instance = axios.create({
    baseURL: '/web',
    timeout: 10000, // 太短可能挂断响应
    headers: {
      'Content-Type': contentType,
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': ''
    }
  });

  // 请求拦截器
  instance.interceptors.request.use(r => {
    console.log('请求参数', url, r.data)
    if (isAuth) {
      const token = useAppCookies().getToken()
      if (token) {
        r.headers.Authorization = 'bearer ' + token
      }else {
        toLogin()
        return Promise.reject(ERR_AUTH_FAILED)
      }
    }
    // 一定要把配置抛出去
    return r
  }, e => Promise.reject(ERR_NO_INTERNET_CONNECTION))

  //响应拦截器
  instance.interceptors.response.use(r => {
    console.log('响应参数', url, r.data)
    if (isSuccess(r.data.status)) {
      return r.data.data
    }else {
      return Promise.reject(r.data)
    }
  }, e => Promise.reject(ERR_NO_INTERNET_CONNECTION))

  let result
  if (method == 'post') {
    result = instance.post(url, data)
  }else {
    result = instance.get(url)
  }
  
  return result;
}

export default request