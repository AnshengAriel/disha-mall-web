import { useAppCookies } from '@/main/composables/AppCookiesUse';
import { useAppMessage } from '@/main/composables/AppMessageUse';
import { useAppSession } from '@/main/composables/AppSessionUse';
import { useAppRouter } from '@/configs/router';
import { useAppStore } from '@/main/composables/AppStoreUse';
import { apiManager } from '@/main/api/ManagerApi';
import { md5Keys } from '@/utils/encrypt';
import { useRule } from './RuleUse';
import { apiRule } from '../api/RuleApi';

const {
  updatePassword,
  login,
  userPage,
  adduser,
  updateuser,
  deleteuser,
} = apiManager()

const {
  toLogin,
  toIndex,
  setRoutes,
  getRouteNameByTitle,
} = useAppRouter()

const {
  removeState,
  saveState
} = useAppSession()

const { 
  setToken,
  removeToken,
} = useAppCookies()

const { 
  setUser,
  setMenus,
  setRules,
} = useAppStore()

const { 
  confirm,
  errorMsgByErr,
  errorMsgAndThrow,
  successMsg,
} = useAppMessage()

const {
  getRuleItemList,
} = useRule()

const { ruleList } = apiRule()

export function useManger(table={}) {

  // 修改密码
  function submitUpdatePassword(model, formRef) {
    return formRef.value.validate().then(() => {
      let params = md5Keys(model, ['oldPassword', 'password', 'confirmPassword'])
      return updatePassword(params).then(r => {
        successMsg('修改成功')
        toLogin()
      }, errorMsgAndThrow)
    })
  }

  // 注销
  function logout() {
    confirm('确定要退出登录吗？', () => {
      removeToken()
      removeState()
      toLogin()
    })
  }

  // 校验并登录
  function submitLogin(model, formRef) {
    return formRef.value.validate().then(() => {
      let params = md5Keys(model, ['password'])
      return login(params).then(d => {
          setToken(d.token)
          setUser(d)
          saveState()
          getRuleItemList(2,1).then(rules => {
            setRoutes(rules)
            afterLogin()
          })
          getRuleItemList(4,1).then(rules => {
            setRules(rules.map(r => r.content + ',' + r.method))
            saveState()
          })
        }, errorMsgAndThrow)
    })
  }

  // 登录后设置权限
  function afterLogin() {
    ruleList({
      type: 3,
      status: 1,
    }).then(menus => {
      const ms = []
      menus.forEach(m => {
        const children = []
        ms.push({
          name: m.name,
          icon: m.icon,
          children: children
        })
        m.children?.forEach(cm => {
          children.push({
            name: cm.name,
            index: getRouteNameByTitle(cm.name),
            icon: cm.icon,
          })
        })
      })
      setMenus(ms)
      saveState()
      successMsg('登录成功')
      toIndex()
    }, errorMsgAndThrow)
  }

  // 用户列表
  function getUserPage() {
    return userPage(table.search).then(d => {
      table.list = d.list
      table.total = d.total
    }, errorMsgAndThrow)
  }

  // 新增
  function submitAddUser(model, formRef) {
    return formRef.value.validate().then(() => {
      return adduser(md5Keys(model,['password']))
        .then(d => {
          successMsg('添加成功')
          getUserPage()
        }, errorMsgAndThrow)
    })
  }

  // 修改
  function submitUpdateUser(model, formRef) {
    return formRef.value.validate().then(() => {
      return updateuser(md5Keys(model,['password']))
        .then(d => {
          successMsg('修改成功')
          getUserPage()
        }, errorMsgAndThrow)
    })
  }

  // 无校验修改
  function submitUserStatus(row) {
    updateuser(row)
      .then(d => {
        successMsg('修改成功')
        getUserPage()
      }).catch(errorMsgByErr)
  }

  // 删除
  function showDeleteUser(row) {
    confirm(`确定要删除【${row.name}】吗？`, () => {
      deleteuser(row)
        .then(d => {
          successMsg('删除成功')
          getUserPage()
      }).catch(errorMsgByErr)
    })
  }

  return {
    submitUpdatePassword: submitUpdatePassword,
    logout: logout,
    submitLogin: submitLogin,
    getUserPage: getUserPage,
    submitAddUser: submitAddUser,
    submitUpdateUser: submitUpdateUser,
    showDeleteUser: showDeleteUser,
    submitUserStatus: submitUserStatus,
  }
}
