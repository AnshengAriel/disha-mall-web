import request from "@/utils/httpclient"

export function apiRole() {

  function addRole(params) {
    return request({
      url: '/role/add',
      params,
    })
  }
  function deleteRole(params) {
    return request({
      url: '/role/delete',
      params,
    })
  }
  function updateRole(params) {
    return request({
      url: '/role/update',
      params,
    })
  }
  function rolePage(params) {
    return request({
      url: '/role/page',
      params,
    })
  }

  function updateRoleRule(params) {
    return request({
      url: '/role/update/rule',
      params,
    })
  }
  function roleRuleList(params) {
    return request({
      url: '/role/list/rule',
      params,
    })
  }

  return {
    addRole: addRole,
    deleteRole: deleteRole,
    updateRole: updateRole,
    rolePage: rolePage,
    updateRoleRule: updateRoleRule,
    roleRuleList: roleRuleList,
  }
}