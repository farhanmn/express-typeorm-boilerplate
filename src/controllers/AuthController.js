import moment from 'moment'

import { SC } from '../helper/statuscode.js'
import { create_token, verify } from '../helper/user.js'
import userServices from '../services/userServices.js'
import { errorValue, validateParams } from '../helper/validate.js'

const signUp = async (req, res) => {
  const { user_email, user_password, user_name, user_phone } = req.body
  try {
    validateParams(req.body, ['user_email', 'user_password'])

    const user = await userServices.checkUser({ user_email })

    errorValue(user, {
      statusCode: SC.UNPROCESSABLE,
      message: 'User with that email or phone already exists',
    })

    await userServices.createUser({
      user_name,
      user_email,
      user_password,
      user_phone,
    })

    return res.stdJson(SC.CREATED, null)
  } catch (e) {
    console.log(e)
    const stCode = e.statusCode || SC.SERVER_ERROR
    const message = e.message || 'Could not perform operation at this time'

    return res.stdJson(stCode, message, null)
  }
}

const signIn = async (req, res) => {
  const { user_email, user_password } = req.body
  try {
    validateParams(req.body, ['user_email', 'user_password'])

    const user = await userServices.checkUser({ user_email })
    errorValue(!user, {
      statusCode: SC.UNAUTHORIZED,
      message: 'User with that email or phone does not exist',
    })

    const verifyData = verify(user, { user_password })
    errorValue(!verifyData, {
      statusCode: SC.UNAUTHORIZED,
      message: 'email or password is incorrect',
    })

    await userServices.updateUser({
      user_id: user.user_id,
      user_last_login_at: moment().format('YYYY-MM-DD HH:mm:ss'),
    })

    user.token = create_token(verifyData)
    return res.stdJson(SC.OK, user)
  } catch (e) {
    console.log(e)
    const stCode = e.statusCode || SC.SERVER_ERROR
    const message = e.message || 'Could not perform operation at this time'

    return res.stdJson(stCode, message, null)
  }
}

export default { signUp, signIn }
