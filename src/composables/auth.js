import { useCookies } from "@vueuse/integrations/useCookies";

const cookies = useCookies()
const tokenName = 'token'

export function getToken() {
  return cookies.get(tokenName)
}

export function setToken(token) {
  return cookies.set(tokenName, token)
}

export function removeToken() {
  return cookies.remove(token)
}