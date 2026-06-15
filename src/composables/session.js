import { useSessionStorage } from "@vueuse/core";
import store from "./store";

const stateName = 'state'
function getSession(key) {
  return useSessionStorage(key).value
}

function setSession(key, value) {
  const session = useSessionStorage(key)
  session.value = value
}

function getSessionJson(key) {
  const value = getSession(key)
  return value ? JSON.parse(value) : {}
}

function setSessionJson(key, value) {
  setSession(key, value ? JSON.stringify(value) : '{}')
}

export function setStateInSessionStorage() {
  setSessionJson(stateName, store.state)
}

export function getStateInSessionStorage() {
  return getSessionJson(stateName)
}