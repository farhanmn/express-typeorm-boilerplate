import { SC } from '../helper/statuscode.js'
import dataSource from '../models/index.js'
const userRepository = dataSource.getRepository('User')

export default {
  async signUp(req, res) {
    const { email, password, name, phone } = req.body
    try {
      const user = await userRepository.findOne({
        where: [{ phone }, { email }],
      })
      if (user) {
        return res.stdJson(
          SC.UNPROCESSABLE,
          null,
          'User with that email or phone already exists'
        )
      }
      console.log('masuk')
      const newUser = userRepository.create({
        name,
        email,
        password,
        phone,
      })
      await userRepository.save(newUser)
      return res.stdJson(
        SC.CREATED,
        null,
        'Account created successfully, please login'
      )
    } catch (e) {
      console.log(e)
      return res.stdJson(
        SC.SERVER_ERROR,
        null,
        'Could not perform operation at this time, kindly try again later.'
      )
    }
  },
}
