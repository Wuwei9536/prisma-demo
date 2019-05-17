const { LoginQuery, LoginMutation } = require('./login')
const { TestQuery, TestMutation } = require('./test')
// const { User } = require('./User')
// const { Post } = require('./Post')

const resolvers = {
    Query: {
        ...LoginQuery,
        ...TestQuery
    },
    Mutation: {
        ...LoginMutation,
        ...TestMutation
    }
    //   User,
    //   Post,
}

module.exports = {
    resolvers,
}
