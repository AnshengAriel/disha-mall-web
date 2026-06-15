import { ElMessage, ElMessageBox } from "element-plus"

export async function confirm(message, todo) {
  return await ElMessageBox.confirm(
    message,
    'Warning',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(() => {
    ElMessage({
      type: 'success',
      message: '已完成',
    })
    todo()
  }).catch(() => {
    ElMessage({
      type: 'info',
      message: '已取消',
    })
  })
}