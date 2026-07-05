
const ERR_NO_INTERNET_CONNECTION = {
  status: 500,
  msg: '没有网络连接'
}

const ERR_AUTH_FAILED = {
  status: 600,
  msg: '登录凭证已过期'
}

const errorCode = {
  10200 : '成功',
  10202: '参数错误',
  10304 : '修改密码失败',
  20006 : '账号或密码错误',
}

function isSuccess(status) {
  return status == 10200
}

function getErrorMsg(status) {
  return errorCode[status]
}

export {
  ERR_NO_INTERNET_CONNECTION,
  ERR_AUTH_FAILED,
  isSuccess,
  getErrorMsg,
}



