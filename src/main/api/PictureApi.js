import request from "@/utils/httpclient"

export function apiPictureCategory() {

  function addPictureCategory(params) {
    return request({
      url: '/picture/category/add',
      params,
    })
  }
  function deletePictureCategory(params) {
    return request({
      url: '/picture/category/delete',
      params,
    })
  }
  function updatePictureCategory(params) {
    return request({
      url: '/picture/category/update',
      params,
    })
  }
  function pictureCategoryPage(params) {
    return request({
      url: '/picture/category/page',
      params,
    })
  }

  return {
    addPictureCategory: addPictureCategory,
    deletePictureCategory: deletePictureCategory,
    updatePictureCategory: updatePictureCategory,
    pictureCategoryPage: pictureCategoryPage,
  }
}

export function apiPicture() {

  function addPicture(params) {
    return request({
      url: '/picture/add',
      params,
      type: 'json'
    })
  }
  function deletePicture(params) {
    return request({
      url: '/picture/delete',
      params,
    })
  }
  function updatePicture(params) {
    return request({
      url: '/picture/update',
      params,
    })
  }
  function picturePage(params) {
    return request({
      url: '/picture/page',
      params,
    })
  }

  return {
    addPicture: addPicture,
    deletePicture: deletePicture,
    updatePicture: updatePicture,
    picturePage: picturePage,
  }
}