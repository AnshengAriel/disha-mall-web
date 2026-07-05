import { apiRule } from '@/main/api/RuleApi';
import { useAppMessage } from '@/main/composables/AppMessageUse';

const {
  addRule,
  deleteRule,
  updateRule,
  ruleList,
  ruleItemList,
} = apiRule()

const { 
  errorMsgByErr,
  errorMsgAndThrow,
  successMsg, 
  confirm 
} = useAppMessage()

export function useRule(tree, cascader) {

  // 列表
  function getRuleList() {
    return ruleList().then(d => {
      tree.data = d
      tree.defaultExpandedKeys = d.map(r => r.id)
      // 展开历史菜单
      if (tree.pid) {
        tree.defaultExpandedKeys.push(tree.pid)
      }
    }, errorMsgAndThrow)
  }

  // 菜单列表
  function getRuleMenuList(ids) {
    return ruleList({
      type: 1,
      excludeIds: ids
    }).then(d => {
      cascader.options = d
    }, errorMsgAndThrow)
  }

  // 权限列表
  function getRuleItemList(type, status) {
    return ruleItemList({
      type,
      status,
    }).catch(errorMsgAndThrow)
  }

  // 新增
  function submitAddRule(model, formRef) {
    return formRef.value.validate().then(() => {
      return addRule(model)
        .then(d => {
          successMsg('添加成功')
          getRuleList()
        }, errorMsgAndThrow)
    })
  }

  // 修改
  function submitUpdateRule(model, formRef) {
    return formRef.value.validate().then(() => {
      return updateRule(model)
        .then(d => {
          successMsg('修改成功')
          getRuleList()
        }, errorMsgAndThrow)
    })
  }

  // 修改
  function updateRuleModel(model) {
    return updateRule({...model})
      .then(d => {
        successMsg('修改成功')
        getRuleList()
      }, errorMsgAndThrow)
  }

  // 删除
  const showDeleteRule = row => {
    tree.pid = row.pid
    confirm(`确定要删除【${row.name}】吗？`, () => {
      deleteRule(row)
        .then(d => {
          successMsg('删除成功')
          getRuleList()
      }).catch(errorMsgByErr)
    })
  }

  // 判断类型
  const ruleIsMenu = type => {
    return type == 1 || type == 2
  }

  return {
    getRuleList: getRuleList,
    getRuleMenuList: getRuleMenuList,
    getRuleItemList: getRuleItemList,
    submitAddRule: submitAddRule,
    submitUpdateRule: submitUpdateRule,
    updateRuleModel: updateRuleModel,
    showDeleteRule: showDeleteRule,
    ruleIsMenu: ruleIsMenu,
  }
}