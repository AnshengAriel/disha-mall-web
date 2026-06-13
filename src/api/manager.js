import md5 from "md5";
import request from "./httpclient";

export function login(user) {
  let params = {...user}
  params.password = md5(params.password)
  return request({
    url: '/user/login',
    params,
    isNotify: false,
    isAuth: false
  })
}