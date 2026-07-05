import request from "@/utils/httpclient"

export function apiRule() {

  function addRule(params) {
    return request({
      url: '/rule/add',
      params,
    })
  }
  function deleteRule(params) {
    return request({
      url: '/rule/delete',
      params,
    })
  }
  function updateRule(params) {
    return request({
      url: '/rule/update',
      params,
    })
  }
  function ruleList(params) {
    return request({
      url: '/rule/list',
      params,
    })
  }
  function ruleItemList(params) {
    return request({
      url: '/rule/list/item',
      params,
    })
  }

  return {
    addRule: addRule,
    deleteRule: deleteRule,
    updateRule: updateRule,
    ruleList: ruleList,
    ruleItemList: ruleItemList,
  }
}