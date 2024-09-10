import jwt from 'jsonwebtoken'
import dataSource from '../models/index.js'

import { SC } from '../helper/statuscode.js'
const { verify } = jwt

const userRepository = dataSource.getRepository('User')

const jwtConf = {
  secret: process.env.JWT_SECRET || 'secret',
  verifyOptions: {
    algorithms: process.env.JWT_ALGORITHM
      ? [process.env.JWT_ALGORITHM]
      : ['HS256'],
  },
}

const useraccess = (router) => {
  router.use(async function (req, res, next) {
    let token =
      req.body.token ||
      req.query.token ||
      req.headers['x-access-token'] ||
      req.headers['authorization'] ||
      req.get('x-access-token') ||
      req.headers['token'] ||
      req.get('authorization')

    if (token && token !== '') {
      token = token.replace('Bearer ', '')

      try {
        const decoded = verify(token, jwtConf.secret, jwtConf.verifyOptions)
        decoded.expx = decoded.exp
        if (decoded.iat) delete decoded.iat
        if (decoded.exp) delete decoded.exp
        if (decoded.userid) {
          const profile = await userRepository.findOne({
            where: {
              user_id: decoded.userid,
            },
          })
          if (!profile) {
            return res.stdJson(SC.UNAUTHORIZED, { status: false })
          } else {
            if (profile.is_deleted == 1) {
              return res.stdJson(SC.UNAUTHORIZED, { status: false })
            } else {
              req.access = decoded
              next()
            }
          }
        }
      } catch (err) {
        console.log(err)
        return res.stdJson(SC.UNAUTHORIZED, { status: false })
      }
    } else {
      if (req.path === '/user/login' || req.path === '/user/register') {
        return next()
      } else {
        return res.stdJson(SC.UNAUTHORIZED, { status: false })
      }
    }
  })
}

export { useraccess }
