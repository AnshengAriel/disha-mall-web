import { apiPicture, apiPictureCategory } from "../api/PictureApi"
import { useAppMessage } from '@/main/composables/AppMessageUse';

const {
  addPicture,
  deletePicture,
  updatePicture,
  picturePage,
} = apiPicture()

const {
  addPictureCategory,
  deletePictureCategory,
  updatePictureCategory,
  pictureCategoryPage,
} = apiPictureCategory()

const { 
  errorMsgByErr, 
  errorMsgAndThrow,
  successMsg, 
  confirm, 
  prompt 
} = useAppMessage()

export function usePicture(table) {

  // 分类列表
  function getPicturePage() {
    return picturePage(table.search).then(d => {
      table.list = d.list
      table.total = d.total
    }, errorMsgAndThrow)
  }

  // 新增图片
  function submitAddPicture(fileUploadRef) {
    const pictures = fileUploadRef.value.getFileList()
    return addPicture({
      categoryId: table.search.categoryId,
      pictures
    }).then(d => {
      successMsg('添加成功')
      fileUploadRef.value?.resetList()
      getPicturePage()
    }, errorMsgAndThrow)
  }

  // 重命名
  const showUpdatePicture = col => {
    prompt('重命名', '', col.name, value => {
      const p = {...col}
      p.name = value
      updatePicture(p)
        .then(d => {
          getPicturePage()
          successMsg('添加成功')
        })
    })
  }

  // 删除
  const showDeletePicture = col => {
    confirm(`确定要删除【${col.name}】吗？`, () => {
      deletePicture(col).then(() => {
          successMsg('删除成功')
          getPicturePage()
        }).catch(e => errorMsgByErr)
    })
  }

  // 点击图片, 只选一张
  const onChangePicture = row => {
    table.list.filter(p => p.id != row.id)
      .forEach(p => p.checked = null)
  }

  // 获取选择的图片
  const getSelectedPicture = () => {
    const p = table.list.find(p => p.checked).path
    table.list.forEach(p => p.checked = null)
    return p
  }

  return {
    getPicturePage: getPicturePage,
    submitAddPicture: submitAddPicture,
    showUpdatePicture: showUpdatePicture,
    showDeletePicture: showDeletePicture,
    onChangePicture: onChangePicture,
    getSelectedPicture: getSelectedPicture,
  }
}

export function usePictureCategory(table) {

  
  // 新增图片分类
  function submitAddPictureCategory(model, formRef) {
    return formRef.value.validate().then(() => {
        return addPictureCategory(model).then(d => {
            successMsg('添加成功')
            getPictureCategoryPage()
          }, errorMsgAndThrow)
      })
  }

  // 修改
  function submitUpdatePictureCategory(model, formRef) {
    return formRef.value.validate().then(() => {
      return updatePictureCategory(model).then(d => {
          successMsg('修改成功')
          getPictureCategoryPage()
        }, errorMsgAndThrow)
    })
  }

  // 删除图片分类
  const showDeletePictureCategory = row => {
    confirm(`确定要删除分类【${row.name}】吗?`, () => {
      deletePictureCategory(row)
        .then(() => {
          successMsg('删除成功')
          getPictureCategoryPage()
        }).catch(errorMsgByErr)
    })
  }

  // 分类列表
  function getPictureCategoryPage() {
    return pictureCategoryPage(table.search).then(d => {
      table.list = d.list
      table.total = d.total
      table.activeId = d.list[0]?.id
    }, errorMsgAndThrow)
  }

  return {
    submitAddPictureCategory,
    submitUpdatePictureCategory,
    showDeletePictureCategory,
    getPictureCategoryPage,
  }
}