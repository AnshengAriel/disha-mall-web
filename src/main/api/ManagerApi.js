import request from "@/utils/httpclient";

export function apiManager() {

  function login(params) {
    return request({
      url: '/user/login',
      params,
      isAuth: false
    })
  }
  function updatePassword(params) {
    return request({
      url: '/user/update/password',
      params,
    })
  }
  function adduser(params) {
    return request({
      url: '/user/add',
      params,
    })
  }
  function deleteuser(params) {
    return request({
      url: '/user/delete',
      params,
    })
  }
  function updateuser(params) {
    return request({
      url: '/user/update',
      params,
    })
  }
  function userPage(params) {
    return request({
      url: '/user/page',
      params,
    })
  }

  return {
    login: login,
    updatePassword: updatePassword,
    adduser: adduser,
    deleteuser: deleteuser,
    updateuser: updateuser,
    userPage: userPage,
  }
}