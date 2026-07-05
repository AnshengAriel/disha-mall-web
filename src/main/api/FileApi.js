

const fileUploadUri = '/web/file/upload'
const fileUrl = 'http://localhost:18080/web/open/file/'

export function apiFile() {

  function getFileUrl(path) {
    return fileUrl + path
  }

  return {
    fileUploadUri: fileUploadUri,
    fileUrl: fileUrl,
    getFileUrl: getFileUrl,
  }
}