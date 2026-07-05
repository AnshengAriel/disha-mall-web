import store from "./AppStoreUse";

const stateName = 'state'
function getSession(key) {
  return window.sessionStorage.getItem(key)
}

function setSession(key, value) {
  window.sessionStorage.setItem(key, value)
}

function getSessionJson(key) {
  const value = getSession(key)
  return value ? JSON.parse(value) : {}
}

function setSessionJson(key, value) {
  setSession(key, value ? JSON.stringify(value) : '{}')
}

export function useAppSession() {

  function saveState() {
    setSessionJson(stateName, store.state)
  }
  function getState() {
    return getSessionJson(stateName)
  }
  function removeState() {
    setSession(stateName, null)
  }

  return {
    saveState: saveState,
    getState: getState,
    removeState: removeState,
  }
}