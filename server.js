import express from 'express'
import expressGraphQL from 'express-graphql'
import schema from './graphQL/userSchema'
import mongoose from 'mongoose'

// * use .env
require('dotenv').config()

// * db config file
const db = require('./config/db')

// * initialize express app
const app = express()

// * graphql endpoint
app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true
}))

// * connect to mongo
mongoose.connect(db.MONGO_URI, err => {
  if (err) {
    throw err
  } else console.log(`Connected to mongo!`)
})

// * run server
const port = process.env.PORT || 3001
app.listen(port, err => {
  if (err) {
    throw err
  } else console.log(`Server running on [${port}]`)
})
