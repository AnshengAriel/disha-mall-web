import request from "@/utils/httpclient"

export function apiNotice() {

  function addNotice(params) {
    return request({
      url: '/notice/add',
      params,
    })
  }
  function deleteNotice(params) {
    return request({
      url: '/notice/delete',
      params,
    })
  }
  function updateNotice(params) {
    return request({
      url: '/notice/update',
      params,
    })
  }
  function noticePage(params) {
    return request({
      url: '/notice/page',
      params,
    })
  }

  return {
    addNotice: addNotice,
    deleteNotice: deleteNotice,
    updateNotice: updateNotice,
    noticePage: noticePage,
  }
}