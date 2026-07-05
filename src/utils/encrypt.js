import md5 from "md5"

export function md5Keys(form, keyNames) {
  const result = {...form}
  Object.keys(result).forEach(k => {
    if (keyNames.includes(k)) {
      result[k] = md5(result[k])
    }
  })
  return result
}