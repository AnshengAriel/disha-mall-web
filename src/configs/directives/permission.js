import { useAppStore } from "@/main/composables/AppStoreUse"

const {
  getRules
} = useAppStore()

const isPermission = (rules) => {
  return rules.findIndex(r => getRules().includes(r)) != -1
}

export default {
  install(app) {
    app.directive('permission', {
      mounted(el, binding) {
        if (!Array.isArray(binding.value)) {
          throw new Error('Need a array which contains some rules')
        }
        if (!isPermission(binding.value)) {
          el.parentNode?.removeChild(el)
        }
      }
    })
  },
}