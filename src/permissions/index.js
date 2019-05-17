const { rule, and, shield } = require('graphql-shield')
const { getUserId } = require('../utils/getUser')

const rules = {
  // 是否是授权用户
  isAuthenticatedUser: rule()((parent, args, context) => {
    // 获取 UserId  返回值 int or undefined
    const userId = getUserId(context)
    // 将Userid 挂载到context上
    context.userId = userId
    // userid存在返回真，通过授权，否则没有权限
    return Boolean(userId)
  }),
  isPostOwner: rule()(async (parent, { id }, context) => {
    const userId = getUserId(context)
    const author = await context.prisma
      .post({
        id,
      })
      .author()
    return userId === author.id
  }),
}

const permissions = shield({
  Query: {
    // queryUsers: rules.isAuthenticatedUser,
  },
  Mutation: {
    // createDraft: rules.isAuthenticatedUser,
    // deletePost: rules.isPostOwner,
    // publish: rules.isPostOwner,
  },
})

module.exports = {
  permissions,
}
