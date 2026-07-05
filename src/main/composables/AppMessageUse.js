import { ElMessageBox, ElNotification } from "element-plus"
import { getErrorMsg } from "@/utils/errorcode";

export function useAppMessage() {

  // 成功通知
  function successMsg(message) {
    ElNotification({
      title: '',
      message,
      type: 'success',
      duration: 1000
    })
  }

  // 失败通知
  function errorMsg(message) {
    ElNotification({
      title: '',
      message,
      type: 'error',
      duration: 2000
    })
  }

  function errorMsgByCode(status) {
    errorMsg(getErrorMsg(status) || `未知的错误代码[${status}]`)
  }

  function errorMsgByErr(e) {
    errorMsg(e instanceof String ? e : (getErrorMsg(e.status) || e.msg))
  }

  function errorMsgAndThrow(e) {
    errorMsg(e instanceof String ? e : (getErrorMsg(e.status) || e.msg))
    return Promise.reject(e)
  }

  // 确认弹窗
  function confirm(message, todo) {
    return ElMessageBox.confirm(
      message,
      'Warning',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
    ).then(todo).catch(e => {})
  }
  
  // 气泡弹窗
  function prompt(title, label, initText, todo) {
    ElMessageBox.prompt(label, title, {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      inputValue: initText
    }).then(({ value }) => {
      todo(value)
    }).catch(e => {})
  }

  return {
    successMsg: successMsg,
    errorMsg: errorMsg,
    errorMsgByCode: errorMsgByCode,
    errorMsgByErr: errorMsgByErr,
    errorMsgAndThrow: errorMsgAndThrow,
    confirm: confirm,
    prompt: prompt,
  }
}