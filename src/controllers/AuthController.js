import { Op } from 'sequelize'
import model from '../models'
import { SC } from '../helper/statuscode'

const { User } = model

export default {
  async signUp(req, res) {
    const { email, password, name, phone } = req.body
    try {
      const user = await User.findOne({
        where: { [Op.or]: [{ phone }, { email }] },
      })
      if (user) {
        return res.stdJson(
          SC.UNPROCESSABLE,
          null,
          'User with that email or phone already exists'
        )
      }

      await User.create({
        name,
        email,
        password,
        phone,
      })
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
