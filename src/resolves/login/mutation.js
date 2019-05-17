const { hash, compare } = require('bcrypt')
const { sign } = require('jsonwebtoken')
const { APP_SECRET } = require('../../utils/getUser')

const LoginMutation = {
  // 注册
  signup: async (parent, { name, email, password }, context) => {
    // 密码通过hash加密
    const hashedPassword = await hash(password, 10)
    // 创建用户
    const user = await context.prisma.createUser({
      name,
      email,
      password: hashedPassword,
    })
    // 使用userId 和 APP_SECRET生成token
    const token = sign({ userId: user.id }, APP_SECRET)
    // 设置cookie
    context.response.cookie('USER_AUTH', `Bearer ${token}`)
    return {
      token,
      user,
    }
  },
  // 登陆
  login: async (parent, { email, password }, context) => {
    // 检索用户
    const user = await context.prisma.user({ email })
    // 用户不存在
    if (!user) {
      throw new Error(`No user found for email: ${email}`)
    }
    // 匹配密码
    const passwordValid = await compare(password, user.password)
    // 密码错误
    if (!passwordValid) {
      throw new Error('Invalid password')
    }
    // 使用userId 和 APP_SECRET生成token
    const token = sign({ userId: user.id }, APP_SECRET)
    // 设置cookie
    context.response.cookie('USER_AUTH', `Bearer ${token}`)
    return {
      token,
      user,
    }
  },
}

module.exports = {
  LoginMutation,
}
