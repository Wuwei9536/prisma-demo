const { verify } = require('jsonwebtoken')

const APP_SECRET = 'appsecret321'

class AuthError extends Error {
  constructor() {
    super('Not authorized')
  }
}

// 获取用户id
function getUserId(context) {
  // 获取cookie值
  const { cookies } = context.request
  // 获取 USER_AUTH
  const { USER_AUTH } = cookies
  // USER_AUTH存在
  if (USER_AUTH) {
    // 去除token前缀Bearer
    const token = USER_AUTH.replace('Bearer ', '')
    // 验证解析token
    const verifiedToken = verify(token, APP_SECRET)
    // verifiedToken存在则返回userId
    return verifiedToken && verifiedToken.userId
  }
  // 认证信息不存在无返回值
}

module.exports = {
  getUserId,
  APP_SECRET,
}
