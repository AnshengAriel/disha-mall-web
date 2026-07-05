
function checkSamePassword(rule, value, callback) {
  if (form.model.password === form.model.oldPassword) {
    callback(new Error('新旧密码重复'))
  }else {
    callback()
  }
}

function checkPassword(rule, value, callback) {
  if (form.model.password === form.model.confirmPassword) {
    callback()
  }else {
    callback(new Error('密码不一致, 请重新输入'))
  }
}

export {
  checkSamePassword,
  checkPassword,
}