import { apiNotice } from '@/main/api/NoticeApi';
import { useAppMessage } from '@/main/composables/AppMessageUse';

const {
  addNotice,
  deleteNotice,
  updateNotice,
  noticePage,
} = apiNotice()

const { 
  errorMsgByErr,
  errorMsgAndThrow,
  successMsg, 
  confirm 
} = useAppMessage()

export function useNotice(table) {

  // 公告列表
  function getNoticePage() {
    return noticePage(table.search).then(d => {
      table.list = d.list
      table.total = d.total
    }, errorMsgAndThrow)
  }

  // 新增
  function submitAddNotice(model, formRef) {
    return formRef.value.validate().then(() => {
      return addNotice(model)
        .then(d => {
          successMsg('添加成功')
          getNoticePage()
        }, errorMsgAndThrow)
    })
  }

  // 修改
  function submitUpdateNotice(model, formRef) {
    return formRef.value.validate().then(() => {
      return updateNotice(model)
        .then(d => {
          successMsg('修改成功')
          getNoticePage()
        }, errorMsgAndThrow)
    })
  }

  // 删除
  const showDeleteNotice = row => {
    confirm(`确定要删除【${row.title}】吗？`, () => {
      deleteNotice(row)
        .then(d => {
          successMsg('删除成功')
          getNoticePage()
      }).catch(errorMsgByErr)
    })
  }

  return {
    getNoticePage: getNoticePage,
    submitAddNotice: submitAddNotice,
    submitUpdateNotice: submitUpdateNotice,
    showDeleteNotice: showDeleteNotice,
  }
}