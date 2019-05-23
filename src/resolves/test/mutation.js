const { hash, compare } = require('bcrypt')
const { sign } = require('jsonwebtoken')

const TestMutation = {
    // 新增草稿
    createDraft(root, args, context) {
        const { title, userId } = args
        return context.prisma.createPost(
            {
                title,
                author: {
                    connect: { id: userId }
                }
            },
        )
    },
    // 发布
    publish(root, args, context) {
        const { postId } = args
        return context.prisma.updatePost(
            {
                where: { id: postId },
                data: { published: true },
            },
        )
    },
    // 新增
    createUser(root, args, context) {
        const { name } = args
        return context.prisma.createUser({ name })
    },
    // 更新
    updateUser(root, args, context) {
        const { id, name } = args
        return context.prisma.updateUser({
            where: { id },
            data: { name }
        })
    },
    // 删除
    deleteUser(root, args, context) {
        const { id } = args
        return context.prisma.deleteUser({ id })
    }
}

module.exports = {
    TestMutation,
}
