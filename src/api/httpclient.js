import axios from "axios"
import { errorMsg } from "@/composables/notification";
import { toLogin } from '@/router'
import { getToken } from "@/composables/auth";

const contentTypeForm = 'application/x-www-form-urlencoded;charset=UTF-8';
const contentTypeJson = 'application/json';
const contentTypeFile = 'multipart/form-data';
function request(config) {
  let {
    url = '', 
    params = {},
    method = 'post',
    type = 'form',
    isNotify = true,
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
      'Authorization': 'bre'
    }
  });

  instance.interceptors.request.use(r => {
    console.log('请求参数', url, r.data)
    if (isAuth) {
      const token = getToken()
      if (token) {
        r.headers.Authorization = 'bearer ' + token
      }else {
        toLogin()
        return Promise.reject({
          msg: '登录凭证已过期'
        })
      }
    }
    // 一定要把配置抛出去
    return r
  }, e => {
    return Promise.reject(e)
  })

  instance.interceptors.response.use(r => {
    console.log('响应参数', url, r.data)
    if (r?.data?.status == 10200) {
      return r.data.data
    }else {
      return Promise.reject(r?.data || {status: r.status, msg: r.statusText})
    }
  }, e => {
    return Promise.reject(e)
  })

  let result
  if (method == 'post') {
    result = instance.post(url, data)
  }else {
    result = instance.get(url)
  }

  // 捕获失败通知
  if (isNotify) {
    result.catch(e => {
      if (e.status == 500) {
        e.msg = '没有网络连接'
      }
      errorMsg(e.msg)
      return Promise.reject(e)
    })
  }
  
  return result;
}

export default request