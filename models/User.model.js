import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  name: {
    type: String
  },
  lastName: {
    type: String
  },
  email: {
    type: String
  },
  age: {
    type: Number
  }
})

export default mongoose.model('usersQL', UserSchema)
