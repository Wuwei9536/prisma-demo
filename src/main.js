// async function main() {
//     // 新建一个user，并新建一个post文章
//     const newUser = await prisma
//       .createUser({
//         name: "Alice",
//         posts: {
//           create: {
//             title: "The data layer for modern apps",
//           }
//         },
//       })
//       console.log("Created new user: ${newUser.name} (ID: ${newUser.id})")
//       // 从数据库中读取所有用户user并将其打印到控制台
//       const allUsers = await prisma.users()
//       console.log(allUsers)
//       // 从数据库中读取所有文章post并将其打印到控制台
//       const allPosts = await prisma.posts()
//       console.log(allPosts)
//     }

// main().catch(e => console.error(e))


const { prisma } = require('./generated/prisma-client')
const { GraphQLServer } = require('graphql-yoga')
const { resolvers } = require('./resolves')
const { permissions } = require('./permissions')
const cookieParser = require('cookie-parser');


// const resolvers = {
// User: {
//     posts(root, args, context) {
//         return context.prisma.user({
//             id: root.id
//         }).posts()
//     }
// },
// Post: {
//     author(root, args, context) {
//         return context.prisma.post({
//             id: root.id
//         }).author()
//     }
// }
// }


const server = new GraphQLServer({
    typeDefs: 'src/schema.graphql',
    resolvers,
    middlewares: [permissions],
    context: request => {
        return {
            ...request,
            prisma,
        }
    },
});
server.express.use(cookieParser());
server.start(
    // {
    //     port: 4001
    // },
    () => console.log('Server is running on http://localhost:4000')
)