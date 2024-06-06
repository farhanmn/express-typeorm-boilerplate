import users from './users.js'
import { SC } from '../helper/statuscode.js'

const errorHandler = (req, res) => {
  res.stdJson(SC.NOT_FOUND, null, 'Invalid route')
}
export default (app) => {
  app.use('/users', users), app.all('*', errorHandler)
}
