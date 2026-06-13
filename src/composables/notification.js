import { ElNotification } from "element-plus";

export function successMsg(message) {
  return ElNotification({
    title: '',
    message,
    type: 'success',
    duration: 1000
  })
}

export function errorMsg(message) {
  return ElNotification({
    title: '',
    message,
    type: 'error',
    duration: 2000
  })
}