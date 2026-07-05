import { apiRole } from '@/main/api/RoleApi';
import { useAppMessage } from '@/main/composables/AppMessageUse';

const {
  addRole,
  deleteRole,
  updateRole,
  rolePage,
  updateRoleRule,
  roleRuleList,
} = apiRole()

const { 
  errorMsgByErr,
  errorMsgAndThrow,
  successMsg, 
  confirm 
} = useAppMessage()

export function useRole(table) {

  // 列表
  function getRolePage() {
    return rolePage(table.search).then(d => {
      table.list = d.list
      table.total = d.total
    }, errorMsgAndThrow)
  }

  // 新增
  function submitAddRole(model, formRef) {
    return formRef.value.validate().then(() => {
      return addRole(model)
        .then(d => {
          successMsg('添加成功')
          getRolePage()
        }, errorMsgAndThrow)
    })
  }

  // 修改
  function submitUpdateRole(model, formRef) {
    return formRef.value.validate().then(() => {
      return updateRole(model)
        .then(d => {
          successMsg('修改成功')
          getRolePage()
        }, errorMsgAndThrow)
    })
  }

  // 修改
  function updateRoleModel(row) {
    return updateRole({...row})
      .then(d => {
        successMsg('修改成功')
        getRolePage()
      }, errorMsgAndThrow)
  }

  // 删除
  const showDeleteRole = row => {
    confirm(`确定要删除【${row.name}】吗？`, () => {
      deleteRole(row)
        .then(d => {
          successMsg('删除成功')
          getRolePage()
      }).catch(errorMsgByErr)
    })
  }

  // 更新配置权限
  function updateRoleRuleModel(row, ruleIds) {
    return updateRoleRule({
      id: row.id,
      ruleIds,
    }).then(d => {
      successMsg('配置成功')
    }, errorMsgAndThrow)
}

  // 获取配置权限
  function getRoleRuleList(row) {
    return roleRuleList(row)
      .catch(errorMsgAndThrow)
  }

  return {
    getRolePage: getRolePage,
    submitAddRole: submitAddRole,
    submitUpdateRole: submitUpdateRole,
    updateRoleModel: updateRoleModel,
    showDeleteRole: showDeleteRole,
    updateRoleRuleModel: updateRoleRuleModel,
    getRoleRuleList: getRoleRuleList,
  }
}