import users from './users'
import { SC } from '../helper/statuscode'

const errorHandler = (req, res) => {
  res.stdJson(SC.NOT_FOUND, null, 'Invalid route')
}
export default (app) => {
  app.use('/users', users), app.all('*', errorHandler)
}
