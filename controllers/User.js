import UserModel from '../models/User.model'

// * Gets all users
export const getUsers = () => {
  return UserModel.find()
}

// * Gets User by id
export const getUserById = id => {
  return UserModel.findById(id)
}

// * Adds user
export const addUser = payload => {
  const newUser = new UserModel(payload)
  return newUser.save({ new: true })
}

// * Edits user by id
export const editUser = (payload) => {
  const { id } = payload
  const body = payload
  delete body.id
  return UserModel.findByIdAndUpdate(id, body, { new: true })
}

// * Deletes user by id
export const deleteUser = id => {
  return UserModel.findByIdAndDelete(id)
}
