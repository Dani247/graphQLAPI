import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} from 'graphql'
import {
  getUsers,
  getUserById,
  addUser,
  editUser,
  deleteUser } from '../controllers/User.js'

// * UserType
const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    _id: { type: GraphQLString },
    name: { type: new GraphQLNonNull(GraphQLString) },
    lastName: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    age: { type: new GraphQLNonNull(GraphQLInt) }
  })
})

// * Root query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    // * get user by id
    user: {
      type: UserType,
      args: {
        id: { type: GraphQLString }
      },
      async resolve (parentValue, args) {
        const { id } = args
        try {
          const result = await getUserById(id)
          return result
        } catch (error) {
          return null
        }
      }
    },
    // * get all users
    users: {
      type: new GraphQLList(UserType),
      async resolve (parentValue, args) {
        try {
          const result = await getUsers()
          return result
        } catch (error) {
          return null
        }
      }
    }
  }
})

// * Mutations
const Mutations = new GraphQLObjectType({
  name: 'MutationsType',
  fields: {
    addUser: {
      type: UserType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        lastName: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) }
      },
      async resolve (parent, args) {
        try {
          return await addUser(args)
        } catch (error) {
          return null
        }
      }
    },
    editUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        age: { type: GraphQLInt }
      },
      async resolve (parent, args) {
        try {
          return await editUser(args)
        } catch (error) {
          return null
        }
      }
    },
    deleteUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) }
      },
      async resolve (parent, args) {
        const { id } = args
        try {
          return await deleteUser(id)
        } catch (error) {
          return null
        }
      }
    }
  }
})

export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutations
})
