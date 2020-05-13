const express = require('express')
const expressGraphQL = require('express-graphql')
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull
} = require('graphql')
const app = express()
// importing data
const {actors, movies} =  require('./data')
// console.log(actors)


const ActorType = new GraphQLObjectType({
  name: 'Actor',
  description: 'This represents a actor',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    age: { type: GraphQLNonNull(GraphQLInt) },
  })
})

const MovieType = new GraphQLObjectType({
    name: "Movie",
    description: "This is a movie",
    fields: () => ({
        id: {type: GraphQLNonNull(GraphQLInt)},
        name: {type: GraphQLNonNull(GraphQLString)},
        description: {type: GraphQLNonNull(GraphQLString)},
        
    })
})


const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields: () => ({
    actors: {
      type: new GraphQLList(ActorType),
      description: 'List of All Actorss',
      resolve: () => actors
    },
    movies: {
        type: new GraphQLList(MovieType),
        description: "List of all movies",
        resolve: () => movies
    }
  })
})


const schema = new GraphQLSchema({
  query: RootQueryType
})

app.use('/graphql', expressGraphQL({
  schema: schema,
  graphiql: true
}))
app.listen(5000, () => console.log('Server Running'))