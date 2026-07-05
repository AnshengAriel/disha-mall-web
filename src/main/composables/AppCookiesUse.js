import { useCookies } from "@vueuse/integrations/useCookies";

const cookies = useCookies()
const tokenName = 'token'

export function useAppCookies() {

  function getToken() {
    return cookies.get(tokenName)
  }
  function setToken(token) {
    return cookies.set(tokenName, token)
  }
  function removeToken() {
    return cookies.remove(tokenName)
  }

  return {
    getToken: getToken,
    setToken: setToken,
    removeToken: removeToken,
  }
}