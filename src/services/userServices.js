import { hash } from '../helper/crypto.js'
import dataSource from '../models/index.js'
const userRepository = dataSource.getRepository('User')

const userServices = {
  checkUser: ({ user_email, user_phone = null }) => {
    return userRepository.findOne({
      where: [{ user_email }, { user_phone }],
    })
  },
  createUser: ({ user_email, user_password, user_name, user_phone }) => {
    const hashpassword = hash(user_password)
    const newUser = userRepository.create({
      user_name,
      user_email,
      user_password: hashpassword.pwd,
      user_password_salt: hashpassword.salt,
      user_phone,
    })
    return userRepository.save(newUser)
  },
  updateUser: ({ user_id, ...data }) => {
    return userRepository.save({ user_id, ...data })
  },

  delUser: ({ user_id }) => {
    return userRepository.delete({ user_id })
  },
}

export default userServices
