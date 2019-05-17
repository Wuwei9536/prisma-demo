const { getUserId } = require('../../utils/getUser')

const TestQuery = {
    // 获取已发布的文章
    publishedPosts(root, args, context) {
        return context.prisma.posts({ where: { published: true } })
    },
    // 获取指定文章
    post(root, args, context) {
        const { postId } = args
        return context.prisma.post({ id: postId })
    },
    // 获取指定作者的文章
    postsByUser(root, args, context) {
        const { userId } = args
        return context.prisma.user({
            id: userId
        }).posts()
    },
    // 获取全部
    queryUsers(root, args, context) {
        return context.prisma.users()
    },
    // 获取一个
    queryUser(root, args, context) {
        const { id } = args
        return context.prisma.user({ id })
    }
}

module.exports = {
    TestQuery,
}
