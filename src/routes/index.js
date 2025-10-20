import users from './users.js'
import sample from './sample.js'
import { SC } from '../helper/statuscode.js'

export default (app) => {
  app.use('/users', users)
  app.use('/sample', sample)
  app.use((req, res) => {
    res.stdJson(SC.NOT_FOUND, null, 'Invalid route')
  })
}
